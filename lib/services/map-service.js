define(
    [
        "services/io-service", 
        "services/object-service",
        "definitions/rooms",
        "definitions/objects"
    ], 
    (
        ioService, 
        objectService,
        rooms,
        objects
    ) => {

    let mapService = {

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
            let objectsInRoom = objectService.getObjectsInRoom(roomName);
            let descriptions = [];
            objectsInRoom.forEach(obj => {
                let object = objects[obj.name];
                descriptions.push(object.description.default);
            });
            if (!objectsInRoom.length) return;
            ioService.Response.say("");
            ioService.Response.say("You can see", true);
            ioService.Response.sayMany(descriptions, true);
        }
    };
    return mapService; 
});