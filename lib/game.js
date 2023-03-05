define(
    [
        "services/parser-service", 
        "services/io-service", 
        "services/command-service",
        "enums/commandPatternTypes", 
    ],
    (
        parserService, 
        ioService, 
        commandService,
        commandPatternTypes,
    ) => {

    let helper = {
        Validation: {
            isOnlyEnter: (command)=> command == '⎆',
        }
    };

    let game = {

        init: ()=>{
            game["Variables"] = {};
            const gv = game.Variables;
            gv.isActive = true;
            gv.command = "";
        },

        Play: {
            runCommand: (command)=>{

                let verb = "";
                let directObject = "";
                let preposition = "";
                let indirectObject = "";

                let clauses = parserService.parse(command);
                if (helper.Validation.isOnlyEnter(command)) return commandService.CR();

                for(var clauseIndex in clauses) {
                    let clause = clauses[clauseIndex];
                    let pattern = parserService.getPattern(clause);

                    switch (pattern) {

                        case commandPatternTypes.VOPO:
                            verb = clause[0].word;
                            directObject = clause[1].word;
                            preposition = clause[2].word;
                            indirectObject = clause[3].word;
                            commandService[verb](directObject, preposition, indirectObject);
                            break;

                        case commandPatternTypes.VV:
                            break;

                        case commandPatternTypes.VO:
                            verb = clause[0].word;
                            directObject = clause[1].word;
                            commandService[verb](directObject);
                            break;

                        case commandPatternTypes.V:
                            verb = clause[0].word;
                            commandService[verb]();
                            break;

                        default:
                            break;
                    }
                }
            }
        }
    }

    game.init();
    return game;
});