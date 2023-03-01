define(
        ["services/map", 
        "services/player", 
        "services/parser", 
        "services/io", 
        "enums/commandPatternTypes", 
        "definitions/objects"],
        (map, 
        player, 
        parser, 
        io, 
        commandPatternTypes)=> {
    let game = {
        init: ()=>{
            game["Variables"] = {};
            const gv = game.Variables;
            gv.isActive = true;
            gv.command = "";
        },

        Play: {
            runCommand: (command)=>{
                if (command.length == 0) return;
                let clauses = parser.parse(command);
                for(var clauseIndex in clauses) {
                    let clause = clauses[clauseIndex];
                    let pattern = parser.getPattern(clause);
                    switch (pattern) {
                        case commandPatternTypes.VO:
                            console.log(clause);
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