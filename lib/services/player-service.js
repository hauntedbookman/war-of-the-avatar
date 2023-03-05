define(
    [
        "services/io-service", 
        "services/object-service",
        "definitions/objects",
    ], (

        ioService, 
        objectService,
        objects

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
        pickUpAllObjects: ()=>{

        },

        pickUpObject: (objectName)=>{

        },
    };

    playerService.init();
    return playerService;
});