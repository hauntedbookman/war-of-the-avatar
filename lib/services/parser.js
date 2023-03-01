define([
    "definitions/dictionary", 
    "enums/commandPatternTypes", 
    "support/common"],(
    dictionary, 
    commandPatternTypes, 
    common)=>{
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

        deconstructClauses: (rawClauses) => {
            let parts = [];
            let clauseEntries = [];
            rawClauses.forEach(clause => {
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

        getPattern: (deconstructedClause)=>{
            let letters = deconstructedClause.map(i => i.type[0]).join("").toUpperCase();
            let pattern = common.getKey(commandPatternTypes, letters);
            return pattern;
        },

        parse: (command) => {
            let rawClauses = helpers.getRawClauses(command);
            let deconstructedClauses = helpers.deconstructClauses(rawClauses);
            return deconstructedClauses;
        }
        
    }
    return parser;
});