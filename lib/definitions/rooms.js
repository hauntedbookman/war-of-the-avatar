define([],()=>{
    const rooms = {
        "Dungeon Cell":{
            "tag": "DungeonCell",
            "name": "Dungeon Cell",
            "defaultDescription":"You find yourself in a dingy, smelly, rather small cell.  The floor is covered in straw.",
            "exits": {
                "south": "Supplies Room",
                "east": "Guard Room One"
            }
        },
        "Guard Room One":{
            "name": "Guard Room One",
            "defaultDescription":"You find yourself in an unremarkably guard room with a wooden desk and a stool under it.",
            "exits": {
                "west": "Dungeon Cell",
                "south": "Dragon's Lair"
            }
        },
        "Supplies Room":{
            "defaultDescription":"",
            "exits": {
                "north": "Dungeon Cell",
                "southeast": "Dragon's Lair"
            }
        },
        "Dragon's Lair":{
            "defaultDescription":"",
            "exits": {
                "northwest": "Supplies Room",
                "north": "Guard Room One"
            }
        }
    }
    return rooms;
});


