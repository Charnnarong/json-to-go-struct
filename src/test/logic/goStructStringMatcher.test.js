import toMatchGoStruct from "./goStructStringMatcher";

expect.extend({
    toMatchGoStruct
});

test('toMatchGoStruct', () => {

    const input = `type Aaa struct {}`;
    const expected = `type Aaa struct {}`;

    expect({value: input}).toMatchGoStruct(expected);

});

test('toMatchGoStruct multi line', () => {

    const input = `type Aaa struct {}`;
    const expected = `type Aaa struct {
    
    }`;

    expect({value: input}).toMatchGoStruct(expected);

});

test('toMatchGoStruct same order', () => {

    const input = `type Aaa struct {
        a xxx yyy 
        b xxx yyy 
    }`;
    const expected = `type Aaa struct {
        a xxx yyy 
        b xxx yyy 
    }`;

    expect({value: input}).toMatchGoStruct(expected);

});

test('toMatchGoStruct different order', () => {

    const input = `type Aaa struct {
        a xxx yyy 
        b
        c
    }`;
    const expected = `type Aaa struct {
        a xxx yyy 
        c
        b
    }`;

    expect({value: input}).toMatchGoStruct(expected);

});