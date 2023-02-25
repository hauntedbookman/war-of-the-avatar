define(["objectStates", "objectAttributes"], (objectStates, objectAttributes)=>{

    let setObjectDefaults = (object) => {
        object["owner"] = "",
        object["room"] = "",
        object["attributes"] = {},
        object["states"] = {},
        object["timeHeld"] = 0
        object.description["updated"] = "";
    };

    let objects = {

        "torch": {
            name: "a torch",
            description:{
                default:"a wooden torch wrapped with strange material at the top.",
                current:"You see on the ground an old wooden torch."
            },
            owner: "player",
            attributes: {
                can: {
                    own: true,
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
            }

        },
        // "guard sword": {
        //     name: "Guard's sword.",
        //     description: "an old sword",
        //     maxDamage: 20,
        // },
        // "guard key": {
        //     basic: "a cell key",
        //     default: "a large, gnarled iron key.",
        //     points: 5,
        //     owner: null,
        //     location: "cell",
        //     attributes: {
        //         can: {
        //             own: true,
        //             usableOn: {
        //                 "cellDoor": {
        //                     points: 10,
        //                     message: "You insert the old iron key into the keyhole and unlock the cell door."
        //                 }
        //             },
        //         }
        //     }
        // },
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
    
    const init = ()=>{
        for (var item in objects) {
            let object = objects[item];
            setObjectDefaults(object);
        }
    }
    init();
    return objects;
});