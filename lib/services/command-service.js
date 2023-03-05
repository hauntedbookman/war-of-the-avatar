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

    };
    let commandService = {
        CR:()=>ioService.Response.say(""),
        go: (direction)=>helper.move(mapService.getDirectionValue(direction)),
        walk: (direction)=>helper.move(direction),
        move: (direction)=>helper.move(direction),
        north: ()=>helper.move(mapService.Constants.Directions.North),
        n: ()=>helper.move(mapService.Constants.Directions.North),
        south: ()=>helper.move(mapService.Constants.Directions.South),
        s: ()=>helper.move(mapService.Constants.Directions.South),
        east: ()=>helper.move(mapService.Constants.Directions.East),
        e: ()=>helper.move(mapService.Constants.Directions.East),
        west: ()=>helper.move(mapService.Constants.Directions.West),
        w: ()=>helper.move(mapService.Constants.Directions.West),
        northeast: ()=>helper.move(mapService.Constants.Directions.NorthEast),
        ne: ()=>helper.move(mapService.Constants.Directions.NorthEast),
        northwest: ()=>helper.move(mapService.Constants.Directions.NorthWest),
        nw: ()=>helper.move(mapService.Constants.Directions.NorthWest),
        southeast: ()=>helper.move(mapService.Constants.Directions.SouthEast),
        se: ()=>helper.move(mapService.Constants.Directions.SouthEast),
        southwest: ()=>helper.move(mapService.Constants.Directions.SouthWest),
        sw: ()=>helper.move(mapService.Constants.Directions.SouthWest),
        get: (object)=>{
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
    }
    return commandService;
});
