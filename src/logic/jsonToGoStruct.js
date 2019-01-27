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


function increaseKeyCount(objMapKeyCount, key , additionKey) {
    let additionKeyCount = 0;

    if(additionKey && additionKey.hasOwnProperty(key)){
        additionKeyCount = additionKey[key];
    }

    if(objMapKeyCount.hasOwnProperty(key)){
        objMapKeyCount[key] = objMapKeyCount[key] + 1 + additionKeyCount;
    }else{
        objMapKeyCount[key] = 1 + additionKeyCount;
    }
}

function makeStructMap(obj, structName, goFloat64 = true) {

    let objMap = {};
    let objMapKeyCount = {};

    let structSignature = {};
    const objType = analyseType(obj, goFloat64);

    if (objType == 'object') {
        for (const key of getSortedKey(obj)) {
            let keyType = analyseType(obj[key], goFloat64);
            if (keyType == 'array_object') {
                const subTypeKey = upperFirstLetter(key);
                keyType = 'array_' + subTypeKey;
                let [subType, subTypeKeyCount] = makeStructMap(obj[key], subTypeKey, goFloat64);
                objMap[subTypeKey] = subType[subTypeKey];
                increaseKeyCount(objMapKeyCount,subTypeKey,subTypeKeyCount)


            }
            else if (keyType == 'object'){
                // Add to the root
                const subTypeKey = upperFirstLetter(key);
                keyType = subTypeKey;
                let [subType, subTypeKeyCount] = makeStructMap(obj[key], subTypeKey, goFloat64);
                objMap[subTypeKey] = subType[subTypeKey];
                increaseKeyCount(objMapKeyCount,subTypeKey,subTypeKeyCount);
                // iterate through object items
                for(const key2 of getSortedKey(obj[key])){
                    const key2Go = upperFirstLetter(key2);
                    let [subType2,subTypeKeyCount] = makeStructMap(obj[key][key2] , key2Go, goFloat64);
                    objMap[key2Go] = subType2[key2Go];
                    increaseKeyCount(objMapKeyCount,key2Go,subTypeKeyCount);
                }
            }
            structSignature[key] = keyType;
        }
    }
    else if (objType == 'array_object') {
        // let signature = {};
        for (let i = 0; i < obj.length; i++) {
            for (const key of getSortedKey(obj[i])) {
                let keyType = analyseType(obj[i][key], goFloat64);
                structSignature[key + ",omitempty"] = keyType
            }
        }
        // structSignature['x'] =  'xxxx';
    }

    objMap[structName] = structSignature;
    increaseKeyCount(objMapKeyCount,structName);

    return [objMap , objMapKeyCount];
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
    const [structMap, structMapKeyCount] = makeStructMap(value, rootStructName, goFloat64);
    console.debug(structMap);
    console.debug(structMapKeyCount);
    const goStruct = constructGoType(structMap);

    return {
        // value: `type ${rootStructName} struct {
        //
        // }`,
        value: goStruct,
        err: false
    };
}

export default jsonToGoStruct