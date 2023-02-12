define(["dictionary"],(dictionary)=>{

    let helpers = {

        getClauses: (command)=>{
            let clauseList = [];
            for(var i in dictionary.conjunctions) {
                let conjunctionList = dictionary.conjunctions[i];
                conjunctionList.forEach(c => {
                    let delimiter = ` ${ c } `;
                    let clauses = command.split(delimiter);
                    if (clauses.length > 1) {
                        clauses.forEach(clause => {
                            clauseList.push(helpers.getClauses(clause));
                        })
                    } else {

                    }
                })
            }
            if (clauseList.length == 0) clauseList.push(command); 
            return clauseList;
        },

        getPattern: (parts)=>{
            let letters = parts.map(i => i.type);
            return [...new Set(letters)].join('');
        },

        getParts: (command)=>{
            let results = [];
            let parts = [];
            let clauses = helpers.getClauses(command);
            clauses.forEach(clausesArray=> {
                for (var clauseIndex in clausesArray) {
                    let clause = clausesArray[clauseIndex];
                    for (var typeIndex in dictionary) {
                        let type = dictionary[typeIndex];
                        let entryFound = false;
                        for (var entry in type) {
                            let alternatives = type[entry];
                            for(var word in alternatives) {
                                let alternative = alternatives[word];
                                let match = (alternative.replace(/\s/, '') == clause.replace(/\s/, ''));
                                match = match || alternative == clause;
                                if (match) {
                                    parts.push({
                                        type: typeIndex[0],
                                        word: entry
                                    });
                                    entryFound = true;
                                } 
                            }
                            if (entryFound) break;
                            for(var altWordIndex in alternatives) {
                                let alternative = alternatives[altWordIndex];
                                let wordsArray = clause.split(' ');
                                for (var wordIndex in wordsArray) {
                                    let word = wordsArray[wordIndex];
                                    let match = word == alternative; 
                                    if (match) {
                                        parts.push({
                                            type: typeIndex[0],
                                            word: entry
                                        });
                                    } 
                                }
                            }

                        }
                    }
                    if (parts.length) results.push(parts);
                    parts = [];
                }
            });
            return results;
        },

        convert: (parts)=>{
            let pattern = {};
            parts.forEach(part => {

            });
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