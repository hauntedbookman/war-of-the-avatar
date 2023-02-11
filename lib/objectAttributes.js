define([], ()=>{
    const objectAttributesList = [
        "shuttable",
        "ignitable",
        "edible",
        "potable",
        "usable",
        "movable"
    ];
    const objectAttributes = {};
    objectAttributesList.forEach(i => objectAttributes[i] = true);
    return objectAttributes;
});