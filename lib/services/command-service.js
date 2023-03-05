define([
        "services/io-service", 
        "services/player-service", 
        "services/map-service",
        "definitions/rooms",
        "definitions/objects"
    ],(
        ioService, 
        playerService, 
        mapService,
        rooms,
        objects,
    )=>{

    let helper = {
        move: (direction)=>{
            ioService.Response.say(""); 
            if (!direction) return ioService.Response.say(`Go where?`);
            let directionName = (mapService.getDirectionName(direction) || "").toLowerCase();
            ioService.Response.say(`Go ${ directionName }.`);
            let nextRoom = rooms[playerService.getLocation()].exits[directionName];
            if (!nextRoom) return ioService.Response.say("Can't go that way.");
            playerService.setLocation(nextRoom);
            ioService.Response.say(""); 
            mapService.describeRoom(playerService.getLocation());            
        },
        get: (object)=>{
            if (object=="score") return commandService.getScore();
            if (!object) return ioService.Response.say("Get what?");
            if (!mapService.isObjectInRoom(object)) return ioService.Response.say(`There seems to be no ${ object } here.`);
            objects[object.toLowerCase()].owner = "player";
            ioService.Response.say(`You pick up a ${ object }.`);
            objects[object.toLowerCase()].location = null;            
        },
        look: (object)=>{
            ioService.Response.say("");
            ioService.Response.say("- Look -");
            if (!object) {
                mapService.describeRoom(playerService.getLocation());
            } else {
                ioService.Response.say("to do...");
            }
        }

    };
    let commandService = {
        CR:()=>ioService.Response.say(""),
        e:()=>helper.move(mapService.Constants.Directions.East),
        east:()=>helper.move(mapService.Constants.Directions.East),
        get:(object)=>helper.get(object),
        go:(direction)=>helper.move(mapService.getDirectionValue(direction)),
        look:(object)=>helper.look(object),
        move:(direction)=>helper.move(direction),
        n:()=>helper.move(mapService.Constants.Directions.North),
        ne:()=>helper.move(mapService.Constants.Directions.NorthEast),
        north:()=>helper.move(mapService.Constants.Directions.North),
        northeast:()=>helper.move(mapService.Constants.Directions.NorthEast),
        northwest:()=>helper.move(mapService.Constants.Directions.NorthWest),
        nw:()=>helper.move(mapService.Constants.Directions.NorthWest),
        s:()=>helper.move(mapService.Constants.Directions.South),
        score:()=>playerService.getScore(),
        se:()=>helper.move(mapService.Constants.Directions.SouthEast),
        south:()=>helper.move(mapService.Constants.Directions.South),
        southeast:()=>helper.move(mapService.Constants.Directions.SouthEast),
        southwest:()=>helper.move(mapService.Constants.Directions.SouthWest),
        sw:()=>helper.move(mapService.Constants.Directions.SouthWest),
        w:()=>helper.move(mapService.Constants.Directions.West),
        walk:(direction)=>helper.move(direction),
        west:()=>helper.move(mapService.Constants.Directions.West),
    }
    return commandService;
});
