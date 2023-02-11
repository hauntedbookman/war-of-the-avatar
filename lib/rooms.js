define([],()=>{
    const rooms = {
        "cell":{
            "name": "Dungeon Cell",
            "defaultDescription":"",
            "exits": {
                "south": "supplies",
                "east": "guardRoomOne"
            }
        },
        "guardRoomOne":{
            "name":"Guard Room One",
            "defaultDescription":"",
            "exits": {
                "west": "cell",
                "south": "dragon"
            }
        },
        "supplies":{
            "name":"Supplies Room",
            "defaultDescription":"",
            "exits": {
                "north": "cell",
                "southeast": "dragon"
            }
        },
        "dragon":{
            "name":"Dragon's Lair",
            "defaultDescription":"",
            "exits": {
                "northwest": "supplies",
                "north": "guardRoomOne"
            }
        }
    }
    return rooms;
});


