define(["io", "map"], (io, map)=>{
    let _location = {};
    let _inventory = {};
    let _score = 0;

    const player = {
        init:()=>{
            _location = map.getRoom("cell")
        },
        addInventoryItem: (item)=>{
            this._inventory[item.name] = item;
        },
        giveInventoryItemTo: (objectName)=>{
            object.owner = objectName;
        },
        setLocation: (value)=>{
            _location = value;
        },
        getLocation:()=>{
            return _location;
        },
        move:(direction)=>{
            io.Response.say("<br>"); 
            io.Response.say(`Go ${ map.getDirectionName(direction) }.`);

            let nextRoom = map[player.location.name].exits[direction];
            if (!nextRoom) {
                io.Response.say("Can't go that way.");
                return;
            }

            io.Response.say(""); 
            player.location = map.getRoom(map[player.location.name].exits[direction]);
            map.describe(player.getLocation());
        }
    };

    player.init();
    return player;
});