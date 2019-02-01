function getSortedKey(obj) {
    return Object.keys(obj).sort((a, b) => a.localeCompare(b))
}


const hasFloat = (arrayOfNumber) => arrayOfNumber.reduce((foundFloat, x) => {
    return foundFloat || !Number.isInteger(x)
}, false);

function analyseTypeOfArray(any, goFloat64) {
    let finalType = "array";

    if (any.length === 0) {
        return finalType + "_empty"
    }

    const first = any[0];
    let plausibleType = typeof first;
    if (plausibleType === "number") {

        plausibleType = "int";

        if (hasFloat(any)) {
            plausibleType = goFloat64 ? "float64" : "float32";
        }

        finalType += "_" + plausibleType;
    } else if (first && plausibleType === 'object' && first.constructor !== Array) {
        finalType += "_object";
    } else {
        finalType += ("_" + plausibleType)
    }

    return finalType;
}

function analyseObjectType(any, goFloat64) {
    let finalType = 'object';
    if (any == null) {
        finalType = "null"
    } else if (any && any.constructor === Array) {
        finalType = analyseTypeOfArray(any, goFloat64);

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
