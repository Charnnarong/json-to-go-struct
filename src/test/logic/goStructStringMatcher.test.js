import toMatchGoStruct from "./toMatchGoStruct";

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

test('toMatchGoStruct multiple type different order', () => {

    const input = `
    type Aaa struct {
        a xxx yyy
        b xxx yyy
    }

    type Baa struct {
        ba xxx yyy
        bb xxx yyy
    }
    `;

    const expected = `
    type Baa struct {
        ba xxx yyy
        bb xxx yyy
    }

    type Aaa struct {
        b xxx yyy
        a xxx yyy
    }
    `;

    expect({value: input}).toMatchGoStruct(expected);

});

test('toMatchGoStruct lack key', () => {

    const input = `type Aaa struct {
        a xxx yyy
        b xxx yyy
    }`;
    const expected = `type Aaa struct {
        a xxx yyy
    }`;

    expect({value: input}).not.toMatchGoStruct(expected);

});

test('toMatchGoStruct differ in type', () => {

    const input = `type Aaa struct {
        a int yyy
        b xxx yyy
    }`;
    const expected = `type Aaa struct {
        a float32 yyy
        b xxx yyy
    }`;

    expect({value: input}).not.toMatchGoStruct(expected);

});

test('toMatchGoStruct differ in json name', () => {

    const input = `type Aaa struct {
        a xxx name
        b xxx yyy
    }`;
    const expected = `type Aaa struct {
        a xxx surname
        b xxx yyy
    }`;

    expect({value: input}).not.toMatchGoStruct(expected);

});

test('toMatchGoStruct different order', () => {

    const input = `type Aaa struct {
        a xxx yyy
        b xxx yyy
        c xxx yyy
    }`;
    const expected = `type Aaa struct {
        a xxx yyy
        c xxx yyy
        b xxx yyy
    }`;

    expect({value: input}).toMatchGoStruct(expected);

});

test('toMatchGoStruct different struct', () => {

    const input = `type Aaa struct {
        a xxx yyy
        b xxx yyy
        c yyy xxx
    }`;
    const expected = `type Aaa struct {
        a xxx yyy
        c xxx yyy
        b xxx yyy
    }`;

    expect({value: input}).not.toMatchGoStruct(expected);

});

