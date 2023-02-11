    addEventListener("DOMContentLoaded", ()=>{
        runGame(window.document);
    });

    const runGame = (document)=>{
        let dom = document;
        let gameWindow = dom.getElementById('game-window');
        let contentElement = dom.getElementById('content');
        let commandLineElement = dom.getElementById('command-line');
        let cursorElement = dom.getElementById('cursor');
        let textElement = dom.getElementById('text-element');

        const Game = {
            
            initialize: ()=>{
                Game["Variables"] = {};
                const gv = Game.Variables;
                gv.isActive = true;
                gv.command = "";
                Game.Map.initialize();
                Game.Player.initialize();
            },

            Play: {
                go: async ()=>{
                    IO.TextMode.off();
                    IO.Response.attachImage("wota-title.6", gameWindow);
                },

                runCommand: async (command)=>{
                    if (command.length == 0) return;
                    switch (`${command.toLowerCase()}`) {
 
                        case "n":
                        case "north":
                        case "go north":
                            Game.Player.move(Game.Map.Constants.Directions.North);
                            break;

                        case "s":
                        case "south":
                        case "go south":
                            Game.Player.move(Game.Map.Constants.Directions.South);
                            break;

                        case "e":
                        case "east":
                        case "go east":
                            Game.Player.move(Game.Map.Constants.Directions.East);
                            break;

                        case "w":
                        case "west":
                        case "go wast":
                            Game.Player.move(Game.Map.Constants.Directions.West);
                            break;

                        case "nw":
                        case "northwest":
                        case "go northwest":
                            Game.Player.move(Game.Map.Constants.Directions.NorthWest);
                            break;

                        case "sw":
                        case "southwest":
                        case "go southwest":
                            Game.Player.move(Game.Map.Constants.Directions.SouthWest);
                            break;


                        case "ne":
                        case "northeast":
                        case "go northeast":
                            Game.Player.move(Game.Map.Constants.Directions.NorthEast);
                            break;


                        case "se":
                        case "southeast":
                        case "go southeast":
                            Game.Player.move(Game.Map.Constants.Directions.SouthEast);
                            break;


                        case "l":
                        case "look":
                            Game.Map.describe();
                            break;
    
                        case "run wota":
                            Game.Play.go();
                            break;

                        case "kiss chaka":
                            IO.Response.say("Yuck! Tastes like feet!");
                            IO.Response.attachImage("chaka-tear", content, 5);
                            IO.Response.playSound("chimp");
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
            },

            Map: {
                getDirectionName: (direction)=>{
                    for(var i in Game.Map.Constants.Directions) {
                        if (Game.Map.Constants.Directions[i] == direction) return i;
                    }
                    return null;
                },
                getDirectionValue: (directionValue)=>{
                    for(var i in Game.Map.Constants.Directions) {
                        if (i == directionValue) return Game.Map.Constants.Directions[i];
                    }
                    return null;
                },
                Constants: {
                    Directions: {
                        North: 1,
                        NorthEast: 2,
                        East: 3,
                        SouthEast: 4,
                        South: 5,
                        SouthWest: 6,
                        West: 7,
                        NorthWest: 8
                    },
                    Rooms: [
                        "Cell",
                        "GuardRoom1",
                        "Supplies",
                        "Dragon",
                        "Treasure",
                        "GuardRoom2",
                        "EvilJester",
                        "Pit",
                        "MagicMirror",
                        "SnakeRoom",
                        "Cavern",
                        "QuickSand",
                        "GiantLair",
                        "Furnace",
                        "Wizard",
                        "Enchantress",
                        "Portal",
                        "Exit"
                    ],

                },
                describe:()=>{
                    IO.Response.say(Game.Player.location.baseDescription);
                },

                initialize:()=>{
                    const gm = Game.Map;
                    const makeRoom = (name, baseDescription, doorways)=>{
                        return {
                            name: name,
                            baseDescription: "",
                            doorways: doorways,
                            description: ""
                        }
                    };
                    gm["Rooms"] = gm["Rooms"] || [];
                    gm.Constants.Rooms.forEach(name=>{
                        gm[name] = makeRoom(name, "", {});
                    });
                    const dir = Game.Map.Constants.Directions;

                    gm.Cell.doorways[dir.East] = gm.GuardRoom1.name;
                    gm.Cell.doorways[dir.South] = gm.Supplies.name;
                    gm.Cell.baseDescription = "You are in a dark, smelly cell."

                    gm.GuardRoom1.doorways[dir.West] = gm.Cell.name;
                    gm.GuardRoom1.doorways[dir.South] = gm.Dragon.name;
                    gm.GuardRoom1.baseDescription = "This smallish room looks like a guard's quarters."

                    gm.Supplies.doorways[dir.North] = gm.Cell.name;
                    gm.Supplies.doorways[dir.South] = gm.Treasure.name;
                    gm.Supplies.doorways[dir.SouthEast] = gm.Dragon.name;
                    gm.Supplies.baseDescription = "This is a supplies room with a larder and sundry arms propped up against the wall.";

                    gm.Dragon.doorways[dir.North] = gm.GuardRoom1.name;
                    gm.Dragon.doorways[dir.NorthWest] = gm.Supplies.name;
                    gm.Dragon.baseDescription = "You are in an immense room with a large red dragon sleeping on a mound of gold!";

                    gm.Treasure.doorways[dir.North] = gm.Supplies.name;
                    gm.Treasure.doorways[dir.East] = gm.GuardRoom2.name;
                    gm.Treasure.baseDescription = "You find yourself in a treasure room!";

                    gm.GuardRoom2.doorways[dir.NorthEast] = gm.Wizard.name;
                    gm.GuardRoom2.doorways[dir.South] = gm.Pit.name;
                    gm.GuardRoom2.baseDescription = "This looks like another guard's quarters."
                    
                }
            },

            Player: {
                initialize:()=>{
                    const pv = Game.Player;
                    pv["location"] = Game.Map.Cell;
                    pv["inventory"] = [];
                    pv["score"] = 0;
                },
                move:(direction)=>{
                    IO.Response.say("<br>"); 
                    IO.Response.say(`Go ${ Game.Map.getDirectionName(direction) }.`);

                    let nextRoom = Game.Map[Game.Player.location.name].doorways[direction];
                    if (!nextRoom) {
                        IO.Response.say("Can't go that way.");
                        return;
                    }

                    IO.Response.say(""); 
                    Game.Player.location = Game.Map[nextRoom];
                    Game.Map.describe();
x                }
            },
        };


        Game.initialize();
        IO.Keyboard.listen();
    }