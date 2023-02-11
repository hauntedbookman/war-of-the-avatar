define([],()=>{
    const dictionary = {

        articles: {
            "the": [ "the" ],
        },

        conjunctions: {
            "and": [ "and", "and then", ",", ";", "then" ]
        },

        verbs: {
            "ascend": [ "ascend", "up", "upward", "u", "go up", "climb up" ],
            "attack": [ "attack", "kill", "assault", "fight" ],
            "burn": [ "burn" ],
            "break": [ "break", "shatter", "smash", "destroy" ],
            "close": [ "close", "shut" ],
            "descend": [ "descend", "down", "downward", "d", "go down", "climb down" ],
            "drink": [ "drink" ],
            "extinguish": [ "extinguish", "put out" ],
            "east": [ "east", "e" ],
            "drop" : [ "drop", "let go of", "relinquish" ],
            "eat": [ "eat", "consume", "swallow", "devour" ],
            "go": [ "go", "walk", "advance", "move", "run" ],
            "hide": [ "hide" ],
            "inventory": [ "inventory", "i", "check inventory" ],
            "jump": [ "jump" ], 
            "light": [ "light", "ignite" ],
            "lock": [ "lock" ],
            "look": [ "look", "examine", "study" ],
            "load": [ "load", "restore" ],
            "map": [ "map" ],
            "north": [ "north", "n"],
            "northeast": [ "northeast", "ne"],
            "northwest": [ "northwest", "nw"],
            "open": [ "open" ],
            "quit": [ "quit", "stop" ],
            "save": [ "save" ],
            "sleep": [ "sleep", "snooze", "nap", "take a nap", "go to sleep", "rest" ],
            "south": [ "south", "s"],
            "southwest": [ "southwest", "sw"],
            "southeast": [ "southeast", "se"],
            "take": [ "take", "grab", "get", "pick up" ],
            "talk": [ "talk", "say" ],
            "use": [ "use", "apply" ],
            "wait": [ "wait", "pause" ],
            "west": [ "west", "w"],
            "unlock": [ "unlock" ],
        },

        prepositions: {
            "at": [ "at" ],
            "across": [ "across" ],
            "behind": [ "behind" ],
            "beside": [ "beside", "beside" ],
            "in": [ "in", "into", "inside" ],
            "on": [ "on", "onto" ],
            "out": [ "out", "outside" ],
            "over": [ "over" ],
            "to": [ "to" ],
            "through": [ "through" ], 
            "under": [ "under", "beneath", "underneath" ],
            "with": [ "with" ]
        },

        objects: {
            "cell" : [ "cell", "cell door" ],
            "door": [ "door" ],
            "furnace": [ "furnace" ],
            "food": [ "food", ],   
            "dragon": [ "dragon" ],
            "enchantress": [ "enchantress", "witch" ],
            "guard key": [ "key" ],
            "jester": [ "jester", "mad jester", "evil jester" ],
            "larder": [ "larder" ],
            "mirror": [ "mirror", "magic mirror" ],
            "pit": [ "pit" ],
            "snakes": [ "snakes" ],
            "sword": [ "sword" ],
            "stairs": [ "stairs" ],
            "self" : [ "self", "myself" ],
            "torch" : [ "torch" ],
            "wizard": [ "wizard", "sorcerer" ],
            "quicksand": [ "quick sand" ],
        }

    };

    return dictionary;
});