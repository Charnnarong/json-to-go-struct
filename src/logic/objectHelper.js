function getSortedKey(obj) {
    return Object.keys(obj).sort((a, b) => a.localeCompare(b))
}

function analyseObjectType(any , recursiveDebt = 0 ,  goFloat64 = true) {
        let finalType = 'object';

        if (any.constructor == Array) {
            finalType = "array";
            if (recursiveDebt > 1 ){
                return finalType;
            }

            let arrayType = "any";
            const typesSet = new Set();
            for (let i = 0; i < any.length; i++) {
                arrayType = analyseType(any[i], recursiveDebt + 1);
                if (arrayType == "number") {
                    // arrayType = Number.isInteger(any[i]) ? "int" : "float";
                    arrayType = analyseNumberType(any[i],goFloat64)
                }
                typesSet.add(arrayType)
            }
            if(typesSet.size == 1){
                arrayType = typesSet.values().next().value;
            }else{
                if(typesSet.has("string")) {
                    arrayType = "string";
                }else if (typesSet.has("float64")){
                    arrayType = "float64";
                }else if (typesSet.has("float32")){
                    arrayType = "float32";
                }
            }
            finalType += ("_" + arrayType)
        }

        return finalType;
}

function analyseNumberType(any,  goFloat64 = true) {

    return Number.isInteger(any) ? "int" : goFloat64 ? "float64" : "float32";
}

function analyseType(any , recursiveDebt = 0 ,  goFloat64 = true) {
    const basicType = typeof(any);
    let finalType = basicType;

    switch (finalType) {
        case "object" : return analyseObjectType(any , recursiveDebt);
        case "number" : return analyseNumberType(any , goFloat64);
        default :
            return finalType;
    }
}

export {
    getSortedKey,
    analyseType
}