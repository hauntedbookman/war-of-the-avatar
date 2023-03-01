define(
        ["map", 
        "player", 
        "parser", 
        "io", 
        "commandPatternTypes", 
        "objects"],
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
                    console.log(clause);
                    if (clause.pattern == commandPatternTypes.VO) {
                    }
                }
                // clauses.forEach(clause => {
                //     debugger;
                //     if (clause.length == 1 && clause.pattern == "v") {
                //         if (!clause[0].solitary) {
                //             io.Response.say(`${ clause } ${ clause[0]  }?`);
                //         }
                //     }
                // });

                // switch (`${command.toLowerCase()}`) {
                //     case "n":
                //     case "north":
                //     case "go north":
                //         player.move(map.Constants.Directions.North);
                //         break;

                //     case "s":
                //     case "south":
                //     case "go south":
                //         player.move(map.Constants.Directions.South);
                //         break;

                //     case "e":
                //     case "east":
                //     case "go east":
                //         player.move(map.Constants.Directions.East);
                //         break;

                //     case "w":
                //     case "west":
                //     case "go wast":
                //         player.move(map.Constants.Directions.West);
                //         break;

                //     case "nw":
                //     case "northwest":
                //     case "go northwest":
                //         player.move(map.Constants.Directions.NorthWest);
                //         break;

                //     case "sw":
                //     case "southwest":
                //     case "go southwest":
                //         player.move(map.Constants.Directions.SouthWest);
                //         break;


                //     case "ne":
                //     case "northeast":
                //     case "go northeast":
                //         player.move(map.Constants.Directions.NorthEast);
                //         break;


                //     case "se":
                //     case "southeast":
                //     case "go southeast":
                //         player.move(map.Constants.Directions.SouthEast);
                //         break;


                //     case "l":
                //     case "look":
                //         map.describe(player.getLocation());
                //         break;

                //     case "quit":
                //         io.Response.say("Good-bye!");    
                //         Game.isActive = false;
                //         break;

                //     case "⎆":
                //         io.Response.say("<br>"); 
                //         break;

                //     default:
                //         io.Response.say("I don't understand.<br>");
                // }

            }
        }
    }

    game.init();
    return game;
});