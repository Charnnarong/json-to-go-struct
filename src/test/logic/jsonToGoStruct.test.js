import jsonToGoStruct from '../../logic/jsonToGoStruct'

var testCases = [
    {
        desc: 'test empty json string',
        input: '{}',
        name: "Aaa",
        expected: `type Aaa struct {}`
    },
    {
        desc: 'test empty json string ignore format',
        input: `{  
        }`,
        name: "Aaa",
        expected: `type Aaa struct {
    
        }`
    },
    {
        desc: 'test uppercase structure name',
        input: '{}',
        name: "aaa",
        expected: `type Aaa struct {}`
    },
    {
        desc: 'test invalid payload',
        input: '{',
        name: "aaa",
        expected: '',
        err: true
    },
];

expect.extend({
    toMatchGoStruct(received, wanted, err) {

        if(  err && received['err']){
            return {
                message: () =>
                    `Expected error : ${received['value']}`,
                pass: true,
            }
        }

        // Not not-white-space (meaning white space) but also not include \r and \n as well.
        const refiinedReceived = received['value'].replace(/[^\S\r\n]/g, '');
        const refiinedWanted = wanted.replace(/[^\S\r\n]/g, '');
        const pass = refiinedReceived.localeCompare(refiinedWanted) == 0;
        if (pass) {
            return {
                message: () =>
                    `expected ------\n${received['value']}\nto be ---------\n${wanted}\n`,
                pass: true,
            }
        } else {
            return {
                message: () =>
                    `expected ------\n${received['value']}\nto be ---------\n${wanted}\n`,
                pass: false,
            };
        }
    }
});

testCases.forEach((m) => {
    test(m.desc, () => expect(jsonToGoStruct(m.input, m.name)).toMatchGoStruct(m.expected, m.err));
});
