define([],()=>{
    const dictionary = {

        articles: {
            "the": { synonyms: [ "the" ] },
        },

        conjunctions: {
            "and": { synonyms: [ "and", "and then", ",", ";", "then" ] }
        },

        verbs: {
            "ascend": { 
                for: "where",
                solitary: true,
                synonyms: [ "ascend", "up", "upward", "u", "go up", "climb up" ],
            },
            "attack": { 
                for: "whom",
                solitary: false,
                synonyms: [ "attack", "kill", "assault", "fight" ],
            },
            "burn": { 
                for: "what",
                solitary: false,
                synonyms:  [ "burn" ],
            },
            "break": { 
                for: "what",
                solitary: false,
                synonyms: [ "break", "shatter", "smash", "destroy" ],
            },
            "close": { 
                for: "what",
                solitary: false,
                synonyms: [ "close", "shut" ],
            },
            "descend": { 
                for: "where",
                solitary: true,
                synonyms: [ "descend", "down", "downward", "d", "go down", "climb down" ],
            },
            "drink": { 
                for: "what",
                solitary: false,
                synonyms:  [ "drink", "guzzle" ],
            },
            "extinguish": { 
                for: "what",
                solitary: false,
                synonyms: [ "extinguish", "put out" ],
            },
            "east": { 
                for: "where",
                solitary: true,
                synonyms: [ "east", "e" ],
            },
            "drop": { 
                for: "what", 
                solitary: false, 
                synonyms: [ "drop", "let go of", "relinquish" ] 
            },
            "eat": { 
                for: "where",
                solitary: true, 
                synonyms: [ "eat", "consume", "swallow", "devour" ],
            },
            "go": { 
                for: "where",
                solitary: false, 
                synonyms: [ "go", "walk", "advance", "move", "run" ] 
            },
            "hide": { 
                for: "where",
                solitary: false,
                synonyms: [ "hide" ] 
            },
            "inventory": { 
                for: "what",
                solitary: true,
                synonyms: ["inventory", "i", "check inventory" ] 
            },
            "jump": { 
                for: "where",
                solitary: false,
                synonyms: [ "jump" ] 
            }, 
            "light": { 
                for: "what",
                solitary: false,
                synonyms: [ "light", "ignite" ] 
            },
            "lock": {
                for: "what",
                solitary: false,
                synonyms: [ "lock" ] 
            },
            "look": {
                for: "where",
                solitary: true,
                synonyms: [ "look", "examine", "study" ] 
            },
            "load": { 
                for: "what",
                solitary: true,
                synonyms: ["load", "restore" ] 
            },
            "map": { 
                for: "what",
                solitary: true,
                synonyms: [ "map" ] 
            },
            "north": { 
                for: "where",
                solitary: true,
                synonyms: [ "north", "n"] 
            },
            "northeast": { 
                for: "where",
                solitary: true,
                synonyms: [ "northeast", "ne"] 
            },
            "northwest": { 
                for: "where",
                solitary: true,
                synonyms: ["northwest", "nw"] 
            },
            "open": { 
                for: "what",
                solitary: false,
                synonyms: [ "open" ] 
            },
            "quit": { 
                for: "what",
                solitary: true,
                synonyms: [ "quit", "stop" ] 
            },
            "save": { 
                for: "what",
                solitary: true,
                synonyms: [ "save" ] 
            },
            "sleep": { 
                for: "where",
                solitary: true,
                synonyms: [ "sleep", "snooze", "nap", "take a nap", "go to sleep", "rest" ] 
            },
            "south": { 
                for: "where",
                solitary: true,
                synonyms: [ "south", "s"] 
            },
            "southwest": { 
                for: "where",
                solitary: true,
                synonyms: [ "southwest", "sw"] 
            },
            "southeast": { 
                for: "where",
                solitary: true,
                synonyms: [ "southeast", "se"] 
            },
            "take": { 
                for: "what",
                solitary: false,
                synonyms: [ "take", "grab", "get", "pick up" ] 
            },
            "talk": { 
                for: "whom",
                solitary: false,
                synonyms: [ "talk", "say" ] 
            },
            "use": { 
                for: "what",
                solitary: false,
                synonyms: [ "use", "apply" ] 
            },
            "wait": { 
                for: "what",
                solitary: false,
                synonyms: [ "wait", "pause" ] 
            },
            "west": { 
                for: "where",
                solitary: true,
                synonyms: [ "west", "w"] 
            },
            "unlock": { 
                for: "where",
                solitary: true,
                synonyms: [ "unlock" ] 
            },
        },

        prepositions: {
            "at": { synonyms: [ "at" ] },
            "across": { synonyms: [ "across" ] },
            "behind": { synonyms: [ "behind" ] },
            "beside": { synonyms: [ "beside", "beside" ] },
            "in": { synonyms: [ "in", "into", "inside" ] },
            "on": { synonyms: [ "on", "onto" ] },
            "out": { synonyms: [ "out", "outside" ] },
            "over": { synonyms: [ "over" ] },
            "to": { synonyms: [ "to" ] },
            "through": { synonyms: [ "through" ] },
            "under": { synonyms: [ "under", "beneath", "underneath" ] },
            "with": { synonyms: [ "with" ] },
        },

        objects: {
            "cell": { synonyms: [ "cell", "cell door" ] },
            "door": { synonyms: [ "door" ] },
            "furnace":{ synonyms: [ "furnace" ] },
            "food": { synonyms: [ "food" ] },   
            "dragon": { synonyms: [ "dragon" ] },
            "enchantress": { synonyms: [ "enchantress", "witch" ] },
            "guard key": { synonyms: [ "key" ] },
            "jester": { synonyms: [ "jester", "mad jester", "evil jester" ] },
            "larder": { synonyms: [ "larder" ] },
            "mirror": { synonyms: [ "mirror", "magic mirror" ] },
            "pit": { synonyms: [ "pit" ] },
            "snakes": { synonyms: [ "snakes" ] },
            "sword": { synonyms: [ "sword" ] },
            "stairs": { synonyms: [ "stairs" ] },
            "self": { synonyms: [ "self", "myself" ] },
            "torch": { synonyms: [ "torch" ] },
            "wizard": { synonyms: [ "wizard", "sorcerer" ] },
            "quicksand": { synonyms: [ "quick sand" ] },
        }

    };

    return dictionary;
});