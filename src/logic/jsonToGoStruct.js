function upperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function parseJson(json) {

    try {
        return {vlaue: JSON.parse(json), err: false}
    } catch (e) {
        return {value: e.message, err: true}
    }
}

function jsonToGoStruct(json, structName) {

    const {value, err} = parseJson(json);
    if (err) {
        return {value, err}
    }


    const properStructName = upperFirstLetter(structName);

    if (json == '{}') {

        return {value: `type ${properStructName} struct {}`, err: false}
    }

    return {
        value: `type ${properStructName} struct {
    
        }`,
        err: false
    };
}

export default jsonToGoStruct