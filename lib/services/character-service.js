define(
    [
        "services/io-service", 
        "services/object-service",
        "definitions/objects",
        "definitions/characters",
    ], (

        ioService, 
        objectService,
        objects,
        characters

    ) => {

    const characterService = {


        getScore: (character)=>{
            return characters[character].score;
        },
        
        setLocation: (character, room) => {
            characters[character].location = room;
        },

        getLocation:(character) => characters[character].location,

        pickUpObject: (character, room, objectName)=>{
            if (objectService.isObjectInRoom(objectName, room) 
                && objectService.canBeOwnedBy(objectName, character)) {
                objectService.giveObjectTo(objectName, character);
                ioService.Response.say($`Picked up a ${ objectName }`);                
            } 
        },

        pickUpAllObjects: (character, room)=>{
            for (var objectName in objects) {
                if (objectService.isObjectInRoom(objectName, room) 
                    && objectService.canBeOwnedBy(objectName, character)) {
                    objectService.giveObjectTo(objectName, character);
                }
                ioService.Response.say($`Picked up a ${ objectName }`);                
            }
        },

    };

    return characterService;
});