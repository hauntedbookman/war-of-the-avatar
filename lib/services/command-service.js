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
        inventory:()=>{
            ioService.Response.say("");
            ioService.Response.say("You are carrying: ");
            let hasInventory = false;
            for(var o in objects) {
                let obj = objects[o];
                if (obj.owner == "player") {
                    ioService.Response.say(o);
                    hasInventory = true;
                }
            }
            if (!hasInventory) ioService.Response.say("nothing.");
        },
        unlock: (directObject, indirectObject)=>{
            debugger;
            if (!directObject) return ioService.Response.say("What do you want to unlock?");
            if (!indirectObject) return ioService.Response.say(`What do you want to unlock the ${ directObject } with?`);
            let objectToUnlock = objects[directObject];
            let objectCanBeUnlocked = objectToUnlock.can.unlock.with != null;
            if (!objectCanBeUnlocked) return ioService.Response.say(`But the ${ directObject } can't be unlocked!`);
            let keyNeeded = objects[directObject].can.unlock.with;
            let keyUsed = objects[indirectObject];
            let playerOwnsKey = keyUsed.owner;
            if (playerOwnsKey && !directObject.is.locked ) return ioService.Response.say(`The ${ indirectObject } is already unlocked.`);
            if (playerOwnsKey && keyUsed.is.for.object == directObject) {
                objectToUnlock.is.locked = false;
                return ioService.Response.say(`You unlock the ${ directObject } with the ${ indirectObject }`);
            }
            if (!playerOwnsKey) return ioService.Response.say(`You don't have the ${ directObject } with which to unlock the ${ indirectObject }!`);
        },
        move: (direction)=>{
            ioService.Response.say(""); 
            if (!direction) return ioService.Response.say(`Go where?`);
            let directionName = (mapService.getDirectionName(direction) || "").toLowerCase();
            ioService.Response.say(`Go ${ directionName }.`);
            let exit = rooms[playerService.getLocation()].exits[directionName];
            if (!exit) return ioService.Response.say("Can't go that way.");
            if (exit.door) {
                let door = objects[exit.door];
                if (door.is.closed) return ioService.Response.say(`The ${ door.name } is closed.`);
            }
            playerService.setLocation(exit.room);
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
        i:()=>helper.inventory(),
        inventory:()=>helper.inventory(),
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
        unlock:(directObject, indirectObject)=>helper.unlock(directObject, indirectObject),
        sw:()=>helper.move(mapService.Constants.Directions.SouthWest),
        w:()=>helper.move(mapService.Constants.Directions.West),
        walk:(direction)=>helper.move(direction),
        west:()=>helper.move(mapService.Constants.Directions.West),
    }
    return commandService;
});
