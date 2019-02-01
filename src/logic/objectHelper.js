function getSortedKey(obj) {
    return Object.keys(obj).sort((a, b) => a.localeCompare(b))
}

function analyseTypeOfArray(any,goFloat64) {
    let finalType = "array";

    if (any.length > 0) {
        const first = any[0];
        let x = typeof first;
        if (x === "number") {
            const hasFloat = any.reduce((foundFloat, x) => {
                return foundFloat || !Number.isInteger(x)
            }, false);

            if (goFloat64) {
                x = hasFloat ? "float64" : "int";
            } else {
                x = hasFloat ? "float32" : "int";
            }

            finalType += "_" + x;
        } else if (first && x === 'object' && first.constructor !== Array) {
            finalType += "_object";
        } else {

            finalType += ("_" + x)
        }
    } else {
        finalType += "_empty"
    }
    return finalType;
}

function analyseObjectType(any, goFloat64) {
    let finalType = 'object';
    if (any == null) {
        finalType = "null"
    } else if (any && any.constructor === Array) {
        finalType =  analyseTypeOfArray(any,goFloat64);

    }

    return finalType;
}

function analyseNumberType(any, goFloat64) {

    if (goFloat64) {
        return Number.isInteger(any) ? "int" : "float64";
    } else {
        return Number.isInteger(any) ? "int" : "float32";
    }
}

function analyseType(any, goFloat64) {
    const basicType = typeof(any);

    switch (basicType) {
        case "object" :
            return analyseObjectType(any, goFloat64);
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
