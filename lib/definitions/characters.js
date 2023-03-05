define([],()=>{

    let characters = {
        "player": {
            name: "Player",
            location: "Dungeon Cell",
            inventory: [],
            score: 0,
            state: {},
            description: ""
        },
        "guard": {
            name: "Guard",
            location: "Guard Room One",
            state: "sleeping",
            description: "You see a fat guard who looks a bit dumpy and overweight.",
            inventory: [],
            mayWander: true,
            mayAttack: true,
            chanceToHit: 60,
            chanceToBeHit: 90,
            hitsToKill: 3,
            attacks: {
                "sword": "The guard wildly swings his sword at you!"
            },
            killableWith: {
                "hands": "You strike at the guard with your hands!",
                "sword": "You swing your sword at the unfortunate fellow!"
            },
            states: {
                "sleeping": "He's leaning against the cell he's supposed to be guarding with his arms folded, head down...snoring away."
            }
        }
    }

    return characters;

});
