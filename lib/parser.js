define(["dictionary", "commandPatternTypes", "common"],(dictionary, commandPatternTypes, common)=>{

    let lastVerbEntry = null;

    let helpers = {

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
                        if (word == synonym) { 
                            return { index: wordIndex, wordType: wordType, entry: entry, word: word }; 
                        }
                    }
                }
            }
            return null;
        },

        getClauses: (command) => {
            let clauses = [ command ];
            let temp = [];
            let delimiters = dictionary["clause delimiters"].synonyms;
            let delimitersFound;
            do {
                delimitersFound = false;
                for (var c in clauses) {
                    let clause = clauses[c]; 

                    for (var d in delimiters) {

                        var delimiter = ` ${ delimiters[d] } `;
                        let newArray = clause.split(delimiter);

                        if (newArray.length > 1) {
                            delete clauses[c];
                            temp = temp.concat(newArray);
                            temp = temp.map(i => {
                                return ` ${ i } `;
                            });
                            clauses = clauses.concat(temp);
                            temp = [];
                            delimitersFound = true;
                            break;
                        } 
                    }
                }
            } while (delimitersFound);
            let results = clauses.filter(i => i).map(i => i.trim()).filter(i=>i);
            return results;
        },

        getDictionaryEntry: (searchValue) => {
            searchValue = searchValue.trim();
            let result = dictionary[searchValue];
            if (result) return result;
            for(var e in dictionary) {
                let entry = dictionary[e];
                let synonyms = entry.synonyms || [];
                let foundEntry = synonyms.indexOf(searchValue) > -1;
                if (foundEntry) return entry;
            }
            return null;
        },

        getParts: (clauses) => {
            let parts = [];
            let clauseEntries = [];
            clauses.forEach(clause => {
                let words = clause.split(' ');
                let searchValue = '';
                for (var w in words) {
                    searchValue += words[w] + ' ';
                    let entry = helpers.getDictionaryEntry(searchValue);
                    if ((entry || { type: null }).type == "verb") lastVerbEntry = entry;
                    if (entry) {
                        entry.word = searchValue.trim();
                        clauseEntries.push(entry);
                        searchValue = "";
                    }
                }
                if (clauseEntries.length == 1 && clauseEntries[0].type != "verb") {
                    if (lastVerbEntry) clauseEntries.unshift(lastVerbEntry);
                    lastVerbEntry = null;
                }
                if (clauseEntries.length) parts.push(clauseEntries);
                clauseEntries = [];
            });
            return parts;
        }
    }

    const parser = {

        parse: (command) => {
            let clauses = helpers.getClauses(command);
            let parts = helpers.getParts(clauses);
            console.log(parts);
            debugger;
            // parts.forEach(i=>{i["pattern"] = helpers.getPattern(i);});
            // return parts;
        }
        
    }
    return parser;
});