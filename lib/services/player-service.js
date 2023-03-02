define(
    [
        "services/io-service", 
        "services/map-service"
    ], (
        ioService, 
        mapService
    ) => {
    let _location = "";
    let _inventory = {};
    let _score = 0;

    const playerService = {
        init:()=>{
            _location = "Dungeon Cell";
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
            ioService.Response.say("<br>"); 
            ioService.Response.say(`Go ${ mapService.getDirectionName(direction) }.`);

            let nextRoom = mapService[player.location.name].exits[direction];
            if (!nextRoom) {
                ioService.Response.say("Can't go that way.");
                return;
            }

            ioService.Response.say(""); 
            player.location = mapService.getRoom(mapService[player.location.name].exits[direction]);
            mapService.describe(player.getLocation());
        }
    };

    playerService.init();
    return playerService;
});