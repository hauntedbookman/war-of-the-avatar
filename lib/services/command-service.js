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

        playerHasObject:(objectName)=>{
            for (var o in objects) {
                let object = objects[o];
                if (object.owner == "player") return true
            }
            return false;
        },

        isObjectAvailableToPlayer: (object)=>{
            let objectToCheckFor = objects[object];
            return (objectToCheckFor.location == playerService.getLocation());
        },

        getObjectAvailableToPlayer: (object)=>{
            if (helper.isObjectAvailableToPlayer(object)) return objects[object];
            return null;
        },

        open:(object)=>{
            let objectToOpen = helper.getObjectAvailableToPlayer(object);
            if (!objectToOpen) return ioService.Response.say(`You don't see a ${ object } here!`);
            if (objectToOpen.is.locked) return ioService.Response.say(`You try but can't open the ${ object }! It seems locked!`);
            if (!objectToOpen.is.closed) return ioService.Response.say(`The ${ object } is already opened!`);
            objectToOpen.is.closed = false;
            ioService.Response.say(`You open up the ${ object }!`);
        },

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

        unlock: (directObject, preposition, indirectObject)=>{

            if (["with", "using"].indexOf(preposition || "with") == -1) return ioService.Response.say("Huh?");
            if (!directObject) return ioService.Response.say("What do you want to unlock?");
            if (!helper.isObjectAvailableToPlayer(directObject)) return ioService.Response.say("You don't see that here!");

            let objectToUnlock = objects[directObject];

            // already unlocked?
            if (!objectToUnlock.is.locked ) return ioService.Response.say(`The ${ indirectObject } is already unlocked.`);

            // is this perpetually locked?
            let objectCanBeUnlocked = objectToUnlock.can.unlock.with != null;
            if (!objectCanBeUnlocked) return ioService.Response.say(`But the ${ directObject } can't be unlocked!`);

            // Checking to see if player has anything to unlock object
            if (!helper.playerHasObject(objectToUnlock.can.unlock.with) && !indirectObject) return ioService.Response.say(`You don't seem to have anything that can unlock the ${ directObject }.`);
            if (helper.playerHasObject(objectToUnlock.can.unlock.with) && !!indirectObject && helper.playerHasObject(indirectObject)) return ioService.Response.say(`Um, you don't have *THAT* to unlock the ${ directObject }.`);
            if (!helper.playerHasObject(objectToUnlock.can.unlock.with)) return ioService.Response.say(`You don't seem to have anything that can unlock the ${ directObject }.`);

            let key = objects[objectToUnlock.can.unlock.with];
            if (key.is.for.object == directObject) {
                objectToUnlock.is.locked = false;
                return ioService.Response.say(`You unlock the ${ directObject } with the ${ indirectObject || objectToUnlock.can.unlock.with }`);
            }
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

        drop: (object)=>{
            if (!object) return ioService.Response.say("Drop what?");
            if (!helper.playerHasObject(object)) return ioService.Response.say(`But you don't have a ${ object }.`);
            objects[object.toLowerCase()].owner = null;
            objects[object.toLowerCase()].location = playerService.getLocation();
            ioService.Response.say(`You drop a ${ object }.`);
        },

        get: (object)=>{
            if (object=="score") return commandService.getScore();
            if (!object) return ioService.Response.say("Get what?");
            if (!mapService.isObjectInRoom(object)) return ioService.Response.say(`There seems to be no ${ object } here.`);
            if (!objects[object].can.own) return ioService.Response.say(`That's not something you can take!`);
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
        drop:(object)=>helper.drop(object),
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
        open:(object)=>helper.open(object),
        s:()=>helper.move(mapService.Constants.Directions.South),
        score:()=>playerService.getScore(),
        se:()=>helper.move(mapService.Constants.Directions.SouthEast),
        south:()=>helper.move(mapService.Constants.Directions.South),
        southeast:()=>helper.move(mapService.Constants.Directions.SouthEast),
        southwest:()=>helper.move(mapService.Constants.Directions.SouthWest),
        unlock:(directObject, preposition, indirectObject)=>helper.unlock(directObject, preposition, indirectObject),
        sw:()=>helper.move(mapService.Constants.Directions.SouthWest),
        w:()=>helper.move(mapService.Constants.Directions.West),
        walk:(direction)=>helper.move(direction),
        west:()=>helper.move(mapService.Constants.Directions.West),
    }
    return commandService;
});
