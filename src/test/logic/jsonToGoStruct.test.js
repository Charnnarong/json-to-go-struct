import jsonToGoStruct from '../../logic/jsonToGoStruct'
import toMatchGoStruct from "./goStructStringMatcher";

const fs = require('fs');

function testResourceAsString(file) {
    return fs.readFileSync("./src/test/resources/" + file, 'utf8');
}

expect.extend({
    toMatchGoStruct
});


test('test empty json string', () => {
    const input = '{}';
    const name = "Aaa";
    const expected = `type Aaa struct {}`;
    expect(jsonToGoStruct(input, name)).toMatchGoStruct(expected);
});

test('test empty json string when there is a space inside', () => {
    const input = '{           }';
    const name = "Aaa";
    const expected = `type Aaa struct {}`;
    expect(jsonToGoStruct(input, name)).toMatchGoStruct(expected);
});

test('test empty json string when there is a new line inside', () => {
    const input = `{    
               
            }`;
    const name = "Aaa";
    const expected = `type Aaa struct {}`;
    expect(jsonToGoStruct(input, name)).toMatchGoStruct(expected);

});

test('test empty json string ignore format', () => {
    const input = `{  
        }`;
    const name = "Aaa";
    const expected = `type Aaa struct {
        
        }`;
    expect(jsonToGoStruct(input, name)).toMatchGoStruct(expected);
});

test('test uppercase structure name', () => {
    const input = `{}`;
    const name = "aaa";
    const expected = `type Aaa struct {}`;
    expect(jsonToGoStruct(input, name)).toMatchGoStruct(expected);
});

test('test invalid payload', () => {
    const input = '{';
    const name = "aaa";
    const expected = '';

    expect(jsonToGoStruct(input, name)).toMatchGoStruct(expected, true);
});

test('test Render simple structure', () => {
    const input = testResourceAsString("example/simpleStruct/input.json");
    const expected = testResourceAsString("example/simpleStruct/output.text");
    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected);
});

test('test Render simple structure for int and float', () => {

    const input = testResourceAsString("example/intAndFloat/input.json");
    const expected = testResourceAsString("example/intAndFloat/output.text");

    expect(jsonToGoStruct(input, "abc")).toMatchGoStruct(expected);
});

test('test Render structure for int and contain array', () => {

    const input = testResourceAsString("example/intAndArray/input.json");
    const expected = testResourceAsString("example/intAndArray/output.text");

    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected);
});

test('test Render nested structure', () => {

    const input = testResourceAsString("example/nestStructure/input.json");
    const expected = testResourceAsString("example/nestStructure/output.text");

    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected);
});

test('test Render nested structure with different types', () => {

    const input = testResourceAsString("example/nestedDifferentType/input.json");
    const expected = testResourceAsString("example/nestedDifferentType/output.text");

    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected);
});


test('test Render nested structure with duplicate types so we will reuse it', () => {

    const input = testResourceAsString("example/nestedDuplicate/input.json");
    const expected = testResourceAsString("example/nestedDuplicate/output.text");

    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected);
});


test("Recursive type", () => {

    const input = testResourceAsString("example/recursiveType/input.json");
    const expected = testResourceAsString("example/recursiveType/output.text");

    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected)
});

test("Object self recursive", () => {

    const input = testResourceAsString("example/objectSelfRecursive/input.json");
    const expected = testResourceAsString("example/objectSelfRecursive/output.text");

    expect(jsonToGoStruct(input, "abc",true)).toMatchGoStruct(expected)
});

test("nestedComplex", () => {

    const input = testResourceAsString("example/nestedComplex/input.json");
    const expected = testResourceAsString("example/nestedComplex/output.text");

    expect(jsonToGoStruct(input, "abc")).toMatchGoStruct(expected)
});

test("startWithArray", () => {

    const input = testResourceAsString("example/startWithArray/input.json");
    const expected = testResourceAsString("example/startWithArray/output.text");

    expect(jsonToGoStruct(input, "abc")).toMatchGoStruct(expected)
});