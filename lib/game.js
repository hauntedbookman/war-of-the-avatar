define(
    [
        "services/map-service", 
        "services/player-service", 
        "services/parser-service", 
        "services/io-service", 
        "enums/commandPatternTypes", 
        "definitions/objects"
    ],
    (
        mapService, 
        playerService, 
        parserService, 
        ioService, 
        commandPatternTypes,
        objects
    ) => {

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
                let objectName = "";
                if (command.length == 0) return;
                let clauses = parserService.parse(command);
                if (clauses.length == 0 && command == '⎆') {
                    ioService.Response.say("");
                    return;
                }
                for(var clauseIndex in clauses) {
                    let clause = clauses[clauseIndex];
                    let pattern = parserService.getPattern(clause);

                    switch (pattern) {

                        case commandPatternTypes.VO:
                            verb = clause[0].word;
                            objectName = clause[1].word;

                            if (verb == "get") {
                                mapService.verifyObjectLocation(objectName);
                            }
                            
                            break;

                        case commandPatternTypes.V:
                            verb = clause[0].word;
                            if (verb == "look") {
                                mapService.describeRoom(playerService.getLocation());
                            }
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