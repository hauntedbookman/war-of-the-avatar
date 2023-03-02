define([],()=>{
    const dictionary = {
        "all": {type: "object", synonyms: [ "everything" ] },
        "clause delimiters":{ type: "conjunction", synonyms: [ "and", "then"] },
        "ascend": { type: "verb", synonyms: [ "ascend", "up", "upward", "u", "go up", "climb up" ] },
        "attack": { type: "verb", synonyms: [ "attack", "kill", "assault", "fight" ] },
        "burn": { type: "verb", synonyms: [] },
        "drop": { type: "verb", synonyms:[] },
        "get": { type: "verb", synonyms:[ "take", "grab" ] },
        "go": { type: "verb", synonyms:[ "walk" ] },
        "guard key": { type: "object", synonyms:[ "key" ] },
        "inventory": { type: "verb", synonyms:[ "i" ] },
        "look": { type: "verb", synonyms:[] },
        "the":{ type: "article", synonyms: [] },
        "torch": { type: "object", synonyms:[] },
        "use": { type: "verb", synonyms:[] },
    }
    return dictionary;
});