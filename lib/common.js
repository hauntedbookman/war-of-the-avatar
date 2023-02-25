define([],()=>{
    let common = {
        getCopy: (obj)=>JSON.parse(JSON.stringify(obj)),
        compare: ( a, b ) => {
            if ( a < b ) return -1;
            if ( a > b ) return 1;
            return 0;
        }
    }
    return common;
});
