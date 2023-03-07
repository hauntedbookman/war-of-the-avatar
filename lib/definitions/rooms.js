define([],()=>{
    const rooms = {
        "Dungeon Cell":{
            "tag": "DungeonCell",
            "name": "Dungeon Cell",
            "defaultDescription":"You find yourself in a cramped but tall stone cell, whose floor is covered with moldy and pungent straw.",
            "exits": {
                "south": {
                    "room": "Supplies Room",
                    "door": null
                },
                "east": { 
                    "room": "Guard Room One",
                    "door": "cell door"
                }
            }
        },
        "Guard Room One":{
            "name": "Guard Room One",
            "defaultDescription":"You are in an unremarkable guard room with a wooden desk and a stool under it.",
            "exits": {
                "west": {
                    "room": "Dungeon Cell",
                    "door": null
                },
                "south": {
                    "room": "Dragon's Lair",
                    "door": null
                }
            }
        },
        "Supplies Room":{
            "defaultDescription":"",
            "exits": {
                "north": {
                    "room": "Dungeon Cell",
                    "door": null
                },
                "southeast": {
                    "room": "Dragon's Lair",
                    "door": null
                }
            }
        },
        "Dragon's Lair":{
            "defaultDescription":"",
            "exits": {
                "northwest": {
                    "room": "Supplies Room",
                    "door": null
                },
                "north": {
                    "room": "Guard Room One",
                    "door": null
                }
            }
        }
    }
    return rooms;
});