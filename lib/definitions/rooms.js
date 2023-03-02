define([],()=>{
    const rooms = {
        "Dungeon Cell":{
            "tag": "DungeonCell",
            "defaultDescription":"",
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


