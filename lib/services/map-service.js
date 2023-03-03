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

        let helpers = {
        isObjectInRoom: (objectName) => objects[objectName].location == playerService.getLocation(),
    };

    let mapService = {

        getListOfObjectsInRoom: (roomName)=> {
            let objectList = [];
            for (var o in objects) {
                let object = objects[o];
                if (object.location == roomName) objectList.push(o);
            }
            return objectList;
        },

        verifyObjectLocation: (objectName)=> {
            if (!helpers.isObjectInRoom(objectName)) {
                ioService.Response.Say(`There is no ${ objectName } here.`);
            } 
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
                if (i == directionValue) return mapService.Constants.Directions[i];
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
            // ioService.Response.say("Items in room:");
            // let objectsInRoom = mapService.getListOfObjectsInRoom(roomName);
            // ioService.Response.sayMany(objectsInRoom);
        }
    };
    return mapService; 
});