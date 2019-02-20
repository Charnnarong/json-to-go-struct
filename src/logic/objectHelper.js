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

        return finalType + "_" + plausibleType;

    }

    if (first && plausibleType === 'object' && first.constructor !== Array) {
        return finalType + "_object";

    }
    return finalType + ("_" + plausibleType)

}

function analyseObjectType(any, goFloat64) {

    if (any == null) {
        return "null"
    }
    if (any && any.constructor === Array) {
        return analyseTypeOfArray(any, goFloat64);

    }

    return 'object';
}

function analyseNumberType(any, goFloat64) {

    if (Number.isInteger(any)) {
        return "int"
    }

    if (goFloat64) {
        return "float64";
    }
    return "float32";

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
