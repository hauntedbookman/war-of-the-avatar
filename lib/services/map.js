define(["services/io", "definitions/rooms"], (io, rooms)=>{
    let map = {
        getRoom: (name)=>{
            return (rooms[name] ?? null);
        },
        getDirectionName: (direction)=>{
            for(var i in map.Constants.Directions) {
                if (map.Constants.Directions[i] == direction) return i;
            }
            return null;
        },
        getDirectionValue: (directionValue)=>{
            for(var i in map.Constants.Directions) {
                if (i == directionValue) return map.Constants.Directions[i];
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
            io.Response.say(location.name);
            io.Response.say(location.defaultDescription);
        }
    };
    return map; 
});