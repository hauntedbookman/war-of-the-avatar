define([
        "definitions/objects",
        "definitions/characters"
    ],(
        objects,
        characters
    )=>{

    let objectService = {

        characterHasObject: (object, character)=>{
            return objects[object].owner == character;
        },

        getObjectAvailableToCharacter: (object, characterName)=>{
            if (objectService.isObjectAvailableToCharacter(object, characterName)) {
                return objects[object].can.be.owned.by.indexOf(characterName) > -1;
            }
            return null;
        },

        isObjectAvailableToCharacter: (object, characterName)=>{
            let objectToCheckFor = objects[object];
            return (objectToCheckFor.location == characters[characterName].location);
        },

        getListOfObjectsInRoom: (roomName)=> {
            let objectList = [];
            for (var o in objects) {
                let object = objects[o];
                if (object.location == roomName) objectList.push(o);
            }
            return objectList;
        },

        isObjectInRoom: (object, room)=>{
            return objects[object].location == room;
        },

        giveObjectTo: (object, characterName)=>{
            objects[object].owner = characterName;
        },

        canBeOwnedBy: (object, characterName)=>{
            if (!objects[object].can.be.owned) return false;
            return objects[object].can.be.owned.by.indexOf(characterName) >- 1;
        },

        getObjectDescription: (object)=>objects[object].description

        
    };

    return objectService;

});
