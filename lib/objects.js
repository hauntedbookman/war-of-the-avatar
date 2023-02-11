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
            description: {
                basic: "a torch",
                default: "an oak torch wrapped with strange material at the top."
            }
        },
        "guard key": {
            description: {
                basic: "a cell key",
                default: "a large, gnarled iron key."
            }
        },
        "mirror": {
            description: {
                basic: "an oval mirror",
                default: "an enormous, mounted silver mirror, with the faint appearance of rotating constellation in its reflection."
            }
        },
        "furnace": {
            description: "a fiery furnace",
            default: "a large, chromium furnace with a grated door. It's roaring with a strange blue fire."
        },
        "sword": {
            description: "a small sword",
            default: "a small, shiny sword with faint etchings that read 'GUE' on its pommel."
        }

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