function getSortedKey(obj) {
    return Object.keys(obj).sort((a, b) => a.localeCompare(b))
}

function analyseObjectType(any, recursiveDebt = 0, goFloat64 = true) {
    let finalType = 'object';
    if (any == null) {
        finalType = "null"
    } else if (any && any.constructor == Array) {
        finalType = "array";

        if(any.length > 0 ){
            const first = any[0];
            let x = typeof first;
            if(x == "number"){
                x = Number.isInteger(first)? "int" : goFloat64 ? "float64" : "float32"
            }
            finalType += ("_" + x)
        }else{
            finalType += "_empty"
        }

        // if (recursiveDebt > 1) {
        //     return finalType;
        // }
        //
        // let arrayType = "any";
        // const typesSet = new Set();
        // for (let i = 0; i < any.length; i++) {
        //     arrayType = analyseType(any[i], recursiveDebt + 1);
        //     typesSet.add(arrayType)
        // }
        //
        // if (typesSet.size == 1) {
        //     arrayType = typesSet.values().next().value;
        // }
        // else if (typesSet.size == 2) {
        //     let int = '';
        //     let float = '';
        //
        //     typesSet.forEach((value1, value2, set) => {
        //         if (value1.includes("int")) {
        //             int = value1
        //         }
        //         if (value1.includes("float")) {
        //             float = value1
        //         }
        //     });
        //
        //     if (int && float) {
        //         arrayType = float;
        //     }
        //     // else{
        //     //     arrayType = "any"
        //     // }
        // } else {
        //     let int = ''
        //     let float = ''
        //     let string = ''
        //
        //     typesSet.forEach((value1, value2, set) => {
        //         if (value1.includes("int")) {
        //             int = value1
        //         }
        //         if (value1.includes("float")) {
        //             float = value1
        //         }
        //         if (value1.includes("string")) {
        //             string = value1
        //         }
        //     });
        //
        //     if (int && float && string) {
        //         arrayType = string.replace("string","any");
        //     }
        // }
        //
        //
        // finalType += ("_" + arrayType)
    }

    return finalType;
}

function analyseNumberType(any, goFloat64 = true) {

    return Number.isInteger(any) ? "int" : goFloat64 ? "float64" : "float32";
}

function analyseType(any, recursiveDebt = 0, goFloat64 = true) {
    const basicType = typeof(any);
    // let finalType = basicType;

    switch (basicType) {
        case "object" :
            return analyseObjectType(any, recursiveDebt);
        case "number" :
            return analyseNumberType(any, goFloat64);
        default :
            return basicType;
    }
}

export {
    getSortedKey,
    analyseType
}