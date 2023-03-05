define(
    [
        "definitions/dictionary", 
        "enums/commandPatternTypes", 
        "support/common"
    ], 
    (
        dictionary, 
        commandPatternTypes, 
        common
    ) => {
    let lastVerbEntry = null;
    let helpers = {

        getRawClauses: (command) => {
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

        getDictionaryEntry: (commandLineWord) => {
            commandLineWord = commandLineWord.trim();
            let entry = dictionary[commandLineWord];
            if (entry) return { word: commandLineWord, definition: entry };
            for(var e in dictionary) {
                let entry = dictionary[e];
                let synonyms = entry.synonyms || [];
                let foundEntry = synonyms.indexOf(commandLineWord) > -1;
                if (foundEntry) {
                    return { word: commandLineWord, definition: entry };
                }
            }
            return null;
        },

        deconstructClauses: (rawClauses) => {
            let parts = [];
            let clauseEntries = [];
            rawClauses.forEach(clause => {
                let words = clause.split(' ');
                let commandLineWord = '';
                for (var w in words) {
                    commandLineWord += words[w] + ' ';
                    let entry = helpers.getDictionaryEntry(commandLineWord);
                    if ((entry || { type: null }).type == "verb") lastVerbEntry = entry;
                    if (entry) {
                        entry.commandLineWord = commandLineWord.trim();
                        entry.word = entry.word;
                        entry.definition = entry.definition;
                        clauseEntries.push(entry);
                        commandLineWord = "";
                    }
                }
                if (clauseEntries.length == 1 && clauseEntries[0].definition.type != "verb") {
                    if (lastVerbEntry) clauseEntries.unshift(lastVerbEntry);
                    lastVerbEntry = null;
                }
                if (clauseEntries.length) parts.push(clauseEntries);
                clauseEntries = [];
            });
            return parts;
        }
    }

    const parserService = {

        getPattern: (deconstructedClause)=>{
            let letters = deconstructedClause.map(i => i.definition.type[0]).join("").toUpperCase();
            let pattern = common.getKey(commandPatternTypes, letters);
            return pattern;
        },

        parse: (command) => {
            let rawClauses = helpers.getRawClauses(command);
            let deconstructedClauses = helpers.deconstructClauses(rawClauses);
            return deconstructedClauses;
        }
        
    }
    return parserService;
});