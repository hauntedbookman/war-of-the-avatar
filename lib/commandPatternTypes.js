define([],()=>{

    let commandPatternTypes = {
        V: "V", // VERB (like "look")
        VV: "VV", // VERB->VERB (like "go north" - north is treated as a verb/noun)
        VO: "VO", // VERB->OBJECT (standard action: "get key")
        VOPO: "VOPO", // VERB->OBJECT->PREPOSITION->OBJECT (complex action: "put key on table")
        NA: "ERR"
    }
    return commandPatternTypes;
});