define(
    [
        "services/io-service", 
        "services/player-service",
        "definitions/rooms",
        "definitions/objects"
    ], 
    (
        ioService, 
        playerService,
        rooms,
        objects
    ) => {

    let mapService = {
        getListOfObjectsInRoom: (roomName)=> {
            let objectList = [];
            for (var o in objects) {
                let object = objects[o];
                if (object.location == roomName) objectList.push(o);
            }
            return objectList;
        },

        isObjectInRoom: (objectName) => {
            return (objects[objectName] || { location: "N/A" }).location == playerService.getLocation();
        },

        getRoom: (name)=>{
            return (rooms[name] ?? null);
        },

        getDirectionName: (direction)=>{
            for(var i in mapService.Constants.Directions) {
                if (mapService.Constants.Directions[i] == direction) return i;
            }
            return null;
        },

        getDirectionValue: (directionValue)=>{
            for(var i in mapService.Constants.Directions) {
                if (i.toLowerCase() == directionValue.toLowerCase()) return mapService.Constants.Directions[i];
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
        },

        describeRoom:(roomName)=>{
            let room = rooms[roomName];
            ioService.Response.say(room.name);
            ioService.Response.say(room.defaultDescription);
            let objectsInRoom = mapService.getListOfObjectsInRoom(roomName);
            if (!objectsInRoom.length) return;
            ioService.Response.say("");
            ioService.Response.say("Items in room:");
            ioService.Response.sayMany(objectsInRoom);
        }
    };
    return mapService; 
});