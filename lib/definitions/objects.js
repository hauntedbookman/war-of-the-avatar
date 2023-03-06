define(["../definitions/objectStates", "../definitions/objectAttributes"], (objectStates, objectAttributes)=>{

    let objects = {
        "torch": {
            name: "a torch",
            description:{
                default:"a wooden torch wrapped with strange material at the top.",
                current:"You see on the ground an old wooden torch."
            },
            owner: null,
            can: {
                be: {
                    owned: {
                        by: ["player"]
                    }
                },
                light: {
                    with: {
                        "furnace": true,
                    },
                    turnsLeft: 10,
                    maxRelight: 999
                },
                wield: {
                    maxDamage: 2,
                    attackMessage: "You swing the torch!"
                },
                burn: false
            }
        },
        "cell door": {
            name: "cell door",
            location: "Dungeon Cell",
            description: {
                default: "An ugly, gnarly iron cell door with a heavy padlock on it.",
                current: ""
            }, 
            can: {
                be:{
                    owned: null
                },
                open: true,
                unlock: {
                    with: "guard key",
                    times: 1,
                    points: 5
                }
            },
            is: {
                closed: true,
                locked: true
            }
        },
        // "guard sword": {
        //     name: "Guard's sword.",
        //     description: "an old sword",
        //     maxDamage: 20,
        // },
        "guard key": {
            basic: "a cell key",
            description: {
                default: "a large, gnarled iron key is lying on the ground.",
                current: ""
            },
            points: 5,
            owner: null,
            location: "Dungeon Cell",
            is: {
                for: {
                    object: "cell door",
                    points: 10,
                    message: "You insert the old iron key into the keyhole and unlock the cell door."
                }
            },
            can: {
                be: {
                    owned: {
                        by: ["player", "guard"]
                    }
                },
            }
        },
        // "mirror": {
        //     basic: "an oval mirror",
        //     default: "an enormous, mounted silver mirror, with the faint appearance of rotating constellation in its reflection."
        // },
        // "furnace": {
        //     description: "a fiery furnace",
        //     default: "a large, chromium furnace with a grated door. It's roaring with a strange blue fire."
        // },
        // "sword": {
        //     description: "a small sword",
        //     default: "a small, shiny sword with faint etchings that read 'GUE' on its pommel."
        // }

    };
    return objects;
});