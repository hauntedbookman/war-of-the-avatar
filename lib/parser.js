define(["dictionary", "commandPatternTypes", "common"],(dictionary, commandPatternTypes, common)=>{

    let helpers = {

        compare: ( a, b ) => {
            if ( a.index < b.index ) return -1;
            if ( a.index > b.index ) return 1;
            return 0;
        },

        getClauses: (command)=>{
            let clauseList = [];
            for(var i in dictionary.conjunctions) {
                let conjunctionList = dictionary.conjunctions[i].synonyms;
                conjunctionList.every(c => {
                    let delimiter = ` ${ c } `;
                    let clauses = command.split(delimiter);
                    if (clauses.length > 1) {
                        clauses.forEach(clause => {
                            clauseList.push([ clause ]);
                            // clauseList.push(helpers.getClauses(clause));
                        })
                    } else {
                        clauseList.push([ clauses[0] ]);
                        return false;
                    }
                })
            }
            if (clauseList.length == 0) clauseList.push(command); 
            return clauseList;
        },

        getPattern: (parts)=>{
            let letters = parts.map(i => i.wordType[0]);
            let pattern = commandPatternTypes[letters.join('').toUpperCase()] || commandPatternTypes["ERR"];
            return pattern;
        },

        checkMatch: (clause, synonyms, wordType, entry, wordIndex)=>{
            for(var synonymIndex in synonyms) {
                let synonym = synonyms[synonymIndex];
                let match = (synonym.replace(/\s/, '') == clause.replace(/\s/, ''));
                match = match || synonym == clause;
                if (match) return { index: wordIndex, wordType: wordType, entry: entry, word: synonym }; 
                else {
                    let wordsArray = clause.split(' ');
                    for (var wordIndex in wordsArray) {
                        let word = wordsArray[wordIndex]
                        if (word == synonym) return { index: wordIndex, wordType: wordType, entry: entry, word: word }; 
                    }
                }
            }
            return null;
        },

        getParts: (command)=>{
            let results = [];
            let parts = [];
            let clauses = helpers.getClauses(command);
            let lastVerbMatch = null;
            clauses.forEach(clausesArray=> {
                for (var clauseIndex in clausesArray) {
                    let clause = clausesArray[clauseIndex];
                    for (var wordType in dictionary) {
                        let words = dictionary[wordType];
                        let wordIndex = 0;
                        for (var word in words) {
                            let entry = words[word];
                            let synonyms = entry.synonyms || [];
                            let match = helpers.checkMatch(clause, synonyms, wordType, entry, wordIndex);
                            if (wordType == "verbs" && match && !lastVerbMatch) {
                                lastVerbMatch = match;
                            }
                            if (wordType == "objects" && clause.split(' ').length == 1  && match) {
                                let lastVerbMatchCopy =  common.getCopy(lastVerbMatch);
                                lastVerbMatchCopy.index = wordIndex;
                                parts.push(lastVerbMatchCopy);
                                lastVerbMatch = null;
                            }
                            wordIndex++;
                            if (match) parts.push(match); 
                        }
                    }
                    parts.sort(helpers.compare);
                    if (parts.length) results.push(parts);
                    parts = [];
                }
            });
            return results;
        }

    }

    const parser = {

        parse: (command) => {
            let parts = helpers.getParts(command);
            parts.forEach(i=>{i["pattern"] = helpers.getPattern(i);});
            return parts;
        }
        
    }
    return parser;
});