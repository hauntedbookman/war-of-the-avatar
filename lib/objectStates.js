define([], ()=>{
    const objectStatesList = [
        "opened",
        "lit",
        "held",
        "consumed",
        "damaged",
        "used",
        "found"
    ];
    const objectStates = {};
    objectStatesList.forEach(i => objectStates[i] = true);
    return objectStates;
});