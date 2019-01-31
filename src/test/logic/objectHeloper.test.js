import jsonToGoStruct from "../../logic/jsonToGoStruct";
import {analyseType, getSortedKey} from "../../logic/objectHelper";


test("get sorted keys ", () => {
    const x = {b: 1, a: 2};
    const expected = ["a", "b"];
    const result = getSortedKey(x);
    for (let i = 0; i < expected.length; i++) {

        expect(result[i]).toEqual(expected[i])
    }
});

/**
 Undefined                                                  "undefined"
 Null                                                       "object" (see below)
 Boolean                                                    "boolean"
 Number                                                     "number"
 String                                                     "string"
 Symbol         (new in ECMAScript 2015)                    "symbol"
 Host object (provided by the JS environment)               Implementation-dependent
 Function object (implements [[Call]] in ECMA-262 terms)    "function"
 Any other object                                           "object"
 */
test("analyse String Type ", () => {
    const x = "koneCth";
    expect(analyseType(x)).toEqual("string");
});

test("analyse empty Object", () => {
    const x = {};
    expect(analyseType(x)).toEqual("object");
});


test("analyse non empty Object", () => {
    const x = {'a':1};
    expect(analyseType(x)).toEqual("object");
});

test("analyse empty array ", () => {
    const x = [];
    expect(analyseType(x)).toEqual("array_empty");
});

test("analyse Array of int Type ", () => {
    const x = [1,2,3];
    expect(analyseType(x)).toEqual("array_int");
});

test("analyse Array of array of int Type ", () => {
    const x = [[1],[2],[3]];
    expect(analyseType(x)).toEqual("array_object");
});

test("analyse Array of array of any Type ", () => {
    const x = [[1],[2.1],[3]];
    expect(analyseType(x)).toEqual("array_object");
});

test("analyse Array of array of mixed Type ", () => {
    const x = [['sdf'],[34.4],[3]];
    expect(analyseType(x)).toEqual("array_object");
});

test("analyse Array of float Type ", () => {
    const x = [1,2.2,3];
    expect(analyseType(x,true)).toEqual("array_float64");
});
test("analyse Array of float Type ", () => {
    const x = [1,2.2,3];
    expect(analyseType(x)).toEqual("array_float32");
});

test("analyse Array of string Type ", () => {
    const x = ['1','2','3'];
    expect(analyseType(x)).toEqual("array_string");
});