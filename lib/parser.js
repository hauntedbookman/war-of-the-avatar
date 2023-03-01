define(["dictionary", "commandPatternTypes", "common"],(dictionary, commandPatternTypes, common)=>{

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
                            debugger;
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
            debugger;
            return results;
        },

        getParts: (command) => {
            
        }
        

    }

    const parser = {

        parse: (command) => {
            let clauses = helpers.getClauses(command);
            let parts = helpers.getParts(clauses);
            parts.forEach(i=>{i["pattern"] = helpers.getPattern(i);});
            return parts;
        }
        
    }
    return parser;
});