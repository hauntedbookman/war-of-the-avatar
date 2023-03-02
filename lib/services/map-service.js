define(
    [
        "services/io-service", 
        "definitions/rooms",
        "definitions/objects"
    ], 
    (
        ioService, 
        rooms,
        objects
    ) => {

        let helpers = {
        isObjectInRoom: (objectName) => objects[objectName].location == player.getLocation(),
    };

    let mapService = {
        pickUpObject: (objectName)=>{

        },

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
                ioServiceResponse.Say(`There is no ${ objectName } here.`);
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
        describe:(location)=>{
            ioServiceResponse.say(location.name);
            ioServiceResponse.say(location.defaultDescription);
        }
    };
    return mapService; 
});