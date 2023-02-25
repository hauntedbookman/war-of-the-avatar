define([],()=>{

    let npcs = {

        "GuardOne": {
            location: "GuardRoomOne",
            state: "sleeping",
            description: "You see a fat guard who looks a bit dumpy and overweight.",
            inventory: {
                "guard key": {
                    description: "He has a key dangling from the back of his belt."
                },
                "oldSword": {
                    description: "The rotund guardian has what looks like a sword sheathed at his side."
                }
            },
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

    return npcs;

});
