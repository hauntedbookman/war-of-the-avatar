define([],()=>{
    const rooms = {
        "Dungeon Cell":{
            "tag": "DungeonCell",
            "name": "Dungeon Cell",
            "defaultDescription":"You find yourself in a dingy, smelly, rather small cell.  The floor is covered in straw.",
            "exits": {
                "south": "supplies",
                "east": "guardRoomOne"
            }
        },
        "Guard Room One":{
            "defaultDescription":"",
            "exits": {
                "west": "cell",
                "south": "dragon"
            }
        },
        "Supplies Room":{
            "defaultDescription":"",
            "exits": {
                "north": "cell",
                "southeast": "dragon"
            }
        },
        "Dragon's Lair":{
            "defaultDescription":"",
            "exits": {
                "northwest": "supplies",
                "north": "guardRoomOne"
            }
        }
    }
    return rooms;
});


