import {analyseType, getSortedKey} from "./objectHelper";

function upperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function parseJson(json) {

    try {
        return {value: JSON.parse(json), err: false}
    } catch (e) {
        return {value: e.message, err: true}
    }
}

function makeStructMap(obj, structName, goFloat64 = true) {

    let layers = {};
    let goStructCandidate = {} // {  name: [ signature1, signature2, ..... signatureN ] }

    function makeParseKey(prefixKey, key) {
        return `(${prefixKey},${key})`;
    }

    function addToGoStructCandidate(key, arrayOfStringValue) {
        if (goStructCandidate.hasOwnProperty(key)) {
            goStructCandidate[key].push(arrayOfStringValue);
        } else {
            goStructCandidate[key] = [arrayOfStringValue];
        }
    }

    function parseMap(jsonObj, layer, prefixKey) {
        if (jsonObj == null) {
            return;
        }


        for (const key of getSortedKey(jsonObj)) {
            const value = jsonObj[key];
            const type = analyseType(value);
            const parsedKey = makeParseKey(prefixKey, key);

            if (layers.hasOwnProperty(layer)) {
                layers[layer].push([parsedKey, type])
            } else {
                layers[layer] = [[parsedKey, type]]
            }

            if (type == "object") {
                parseMap(value, layer + 1, parsedKey);
                addToGoStructCandidate(key, Object.keys(value))
            } else if (type.includes("array")) {
                value.forEach(v => {
                    if (analyseType(v) == "object") {
                        parseMap(v, layer + 1, parsedKey);
                        addToGoStructCandidate(key, Object.keys(v));
                    }
                });
            }

        }
    }

    let wrapper = {};
    wrapper[structName] = obj;
    parseMap(wrapper, 0, "");

    (function combinedGoStructCandidateMember() {
        Object.keys(goStructCandidate).forEach(key =>{
            let typeMap = {};
            (new Set(flattenDeep(goStructCandidate[key]))).forEach(x => {typeMap[x] = [] });
            goStructCandidate[key] = typeMap;
        })
    })();

    (function fillingTypeToGoStructCandidateMember() {

        const keyList = getSortedKey(layers);
        const keys = keyList.reverse().slice(0,keyList.length-1);
        for( const key of keys ){
            layers[key].forEach(x => {
                let keyStr = x[0];
                let keyStrArray =  keyStr.split(/[,\)]/g).filter(x => x != "");
                let goStructName = keyStrArray[keyStrArray.length - 2 ];
                let memberName= keyStrArray[keyStrArray.length - 1 ];
                let type = x[1];
                if(!goStructCandidate[goStructName][memberName].includes(type)){
                    goStructCandidate[goStructName][memberName].push(type);
                }

            });
        }
    })();


    return layers
}

function flattenDeep(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

function makeGoType(str) {

    return str.replace(/array_/g, '[]');
}

/**
 * --> 'a,b'
 * <-- 'A'
 *
 * --> 'abc,def'
 * <-- 'Abc'
 *
 * @param key2
 */
function makeGoStructVariable(key) {

    let s = key.split(',');

    return upperFirstLetter(s[0])

}

/**
 * @param structMap e.g { Abc: { name: 'string' , surname: 'string' } }
 * @returns {undefined}
 */
function constructGoType(structMap) {

    let result = '';
    for (const key of getSortedKey(structMap)) {
        let goStruct = `type ${key} struct {`;
        const values = structMap[key];
        for (const key2 of getSortedKey(values)) {
            const templatedKeyValue = makeGoStructVariable(key2) + "\t" + makeGoType(values[key2]) + `\t\`json:"${key2}"\``;
            goStruct += "\n" + templatedKeyValue
        }
        goStruct += `\n}`;
        result += goStruct
    }
    return result;
}

function jsonToGoStruct(json, structName, goFloat64 = true) {

    // json.Parse( '{ a : 1.0}' ) will results { a : 1 }
    // In order to keep float as float ( value doesn't matter but type )
    // we will replace all .0 to be .1
    json = json.replace(/\.0/g, '.1');

    // Validate if input string is a valid Jason format.
    const {value, err} = parseJson(json);
    if (err) {
        return {value, err}
    }

    const rootStructName = upperFirstLetter(structName);

    // check empty object
    if (Object.keys(value).length == 0) {
        return {value: `type ${rootStructName} struct {}`, err: false}
    }


    console.debug(value);
    const layers = makeStructMap(value, rootStructName, goFloat64);
    console.debug(layers);
    const goStruct = constructGoType(layers);

    return {
        // value: `type ${rootStructName} struct {
        //
        // }`,
        value: goStruct,
        err: false
    };
}

export default jsonToGoStruct