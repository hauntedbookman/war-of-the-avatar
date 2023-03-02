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
                if (command.length == 0) return;
                let clauses = parserService.parse(command);

                for(var clauseIndex in clauses) {
                    let clause = clauses[clauseIndex];
                    let pattern = parserService.getPattern(clause);

                    switch (pattern) {

                        case commandPatternTypes.VO:
                            verb = clause[0].word;
                            if (verb == "get") {
                                let objectName = clause[1].word;
                                mapService.verifyObjectLocation(objectName);
                            }
                            break;

                        case commandPatternTypes.V:
                            verb = clause[0].word;
                            if (verb == "look") {
                                ioService.Response.say("Items in room:");
                                let objectList = mapService.getListOfObjectsInRoom(playerService.getLocation());
                                for(var o in objectList) {
                                    let objectName = objectList[o];
                                    ioService.Response.say(objectName);
                                }
                            }

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