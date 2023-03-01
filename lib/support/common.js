define([],()=>{
    let common = {
        getCopy: (obj)=>JSON.parse(JSON.stringify(obj)),
        getKey: (object, value) =>  {
            let key = Object.keys(object).find(key => object[key] === value);
            return key;
        },
        compare: ( a, b ) => {
            if ( a < b ) return -1;
            if ( a > b ) return 1;
            return 0;
        }
    }
    return common;
});
