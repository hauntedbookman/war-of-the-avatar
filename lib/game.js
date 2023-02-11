define(["map", "player", "parser"],(map, player, parser)=> {
    let game = {
        init: ()=>{
            game["Variables"] = {};
            const gv = game.Variables;
            gv.isActive = true;
            gv.command = "";
        },

        Play: {
            runCommand: async (command)=>{
                if (command.length == 0) return;
                let parsedCommand = parser.parse(command);
                switch (`${command.toLowerCase()}`) {
                    case "n":
                    case "north":
                    case "go north":
                        player.move(map.Constants.Directions.North);
                        break;

                    case "s":
                    case "south":
                    case "go south":
                        player.move(map.Constants.Directions.South);
                        break;

                    case "e":
                    case "east":
                    case "go east":
                        player.move(map.Constants.Directions.East);
                        break;

                    case "w":
                    case "west":
                    case "go wast":
                        player.move(map.Constants.Directions.West);
                        break;

                    case "nw":
                    case "northwest":
                    case "go northwest":
                        player.move(map.Constants.Directions.NorthWest);
                        break;

                    case "sw":
                    case "southwest":
                    case "go southwest":
                        player.move(map.Constants.Directions.SouthWest);
                        break;


                    case "ne":
                    case "northeast":
                    case "go northeast":
                        player.move(map.Constants.Directions.NorthEast);
                        break;


                    case "se":
                    case "southeast":
                    case "go southeast":
                        player.move(map.Constants.Directions.SouthEast);
                        break;


                    case "l":
                    case "look":
                        map.describe();
                        break;

                    case "quit":
                        IO.Response.say("Good-bye!");    
                        Game.isActive = false;
                        break;

                    case "⎆":
                        IO.Response.say("<br>"); 
                        break;

                    default:
                        IO.Response.say("I don't understand.<br>");
                }

            }
        }
    }

    game.init();
    return game;
});