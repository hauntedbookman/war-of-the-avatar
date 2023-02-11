define(["io", "map"], (io, map)=>{

    let location = {};
    let inventory = {};
    let score = 0;

    const player = {
        init:()=>{
        },
        addInventoryItem: (item)=>{
            inventory[item.name] = item;
        },
        giveInventoryItemTo: (objectName)=>{
            object.owner = objectName;
        },
        set location(value){
            this.location = value;
        },
        get location(){
            return this.location;
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
            map.describe();
        }
    };

    player.init();
    return player;
});