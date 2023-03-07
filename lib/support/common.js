define([],()=>{
    let common = {
        trimRight: (str, val)=>{
            let result = str.split("").splice(-(val.length)).join("");
            if (val == result) return str.substring(0,val.length);
            return str;
        },
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
