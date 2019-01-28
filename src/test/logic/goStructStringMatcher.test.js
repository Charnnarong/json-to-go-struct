import toMatchGoStruct from "./goStructStringMatcher";

expect.extend({
    toMatchGoStruct
})

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
        a xxx yyy sss
        b xxx yyy sss
    }`;
    const expected = `type Aaa struct {
        a xxx yyy sss
        b xxx yyy sss
    }`;

    expect({value: input}).toMatchGoStruct(expected);

});

test('toMatchGoStruct different order', () => {

    const input = `type Aaa struct {
        a xxx yyy sss
        b
        c
    }`;
    const expected = `type Aaa struct {
        a xxx yyy sss
        c
        b
    }`;

    expect({value: input}).toMatchGoStruct(expected);

});