define([
        "services/io-service", 
        "services/player-service", 
        "services/map-service"
    ],(
        ioService, 
        playerService, 
        mapService
    )=>{

    let helper = {
        move: (direction)=>{
            ioService.Response.say("<br>"); 
            ioService.Response.say(`Go ${ mapService.getDirectionName(direction) }.`);
            let nextRoom = mapService[playerService.location.name].exits[direction];
            if (!nextRoom) {
                ioService.Response.say("Can't go that way.");
                return;
            }
            ioService.Response.say(""); 
            playerService.location = mapService.getRoom(mapService[playerService.location.name].exits[direction]);
            mapService.describe(playerService.getLocation());            
        },

    };
    let commandService = {
        CR:()=>{
            ioService.Response.say("");
            return;
        },
        go: (direction)=>helper.move(direction),
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
