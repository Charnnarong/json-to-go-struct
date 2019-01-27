import jsonToGoStruct from '../../logic/jsonToGoStruct'

var testCases = [
    {
        desc: 'test empty json string',
        input: '{}',
        name: "Aaa",
        expected: `type Aaa struct {}`
    },
    {
        desc: 'test empty json string when there is a space inside',
        input: '{           }',
        name: "Aaa",
        expected: `type Aaa struct {}`
    },
    {
        desc: 'test empty json string when there is a new line inside',
        input: `{    
               
               }`,
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
        input: `{}`,
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
    {
        desc: 'test Render simple structure',
        input: `{
                    "name": "kone",
                    "surname": "cth"
                }`,
        name: "abc",
        expected: `type Abc struct {
                    Name string \`json:"name"\`
                    Surname string \`json:"surname"\`
                }`
    },
    {
        desc: 'test Render simple structure for int and float',
        input: `{
                    "name": 1,
                    "surname": 1.0
                }`,
        name: "abc",
        expected: `type Abc struct {
                    Name int \`json:"name"\`
                    Surname float64 \`json:"surname"\`
                }`
    },
    {
        desc: 'test Render structure for int and contain array',
        input: `{
            "name": 1,
            "surname": 1.0,
            "item" : ["a","b","c"]
        }`,
        name: "abc",
        expected: `type Abc struct {
                        Item    []string \`json:"item"\`
                        Name    int      \`json:"name"\`
                        Surname float64  \`json:"surname"\`
                    }`
    },
    {
        desc: 'test Render nested structure',
        input: `{
           "name": 1,
           "surname": 1.0,
           "item" : [ {"a" : 1 , "b" : 99},{"b" : 2},{"c":3}]
       }`,
        name: "abc",
        expected: `type Abc struct {
                        Item    []Item \`json:"item"\`
                        Name    int     \`json:"name"\`
                        Surname float64 \`json:"surname"\`
                    }
                    
                    type Item struct {
                        A int \`json:"a,omitempty"\`
                        B int \`json:"b,omitempty"\`
                        C int \`json:"c,omitempty"\`
                    }`
    },
    {
        desc: 'test Render nested structure with different types',
        input: `{
           "name": 1,
           "surname": 1.0,
           "item" : [ {"a" : 1 , "b" : "hello"},{"b" : "world"},{"c":3.5}]
       }`,
        name: "abc",
        expected: `type Abc struct {
                        Item    []Item  \`json:"item"\`
                        Name    int     \`json:"name"\`
                        Surname float64 \`json:"surname"\`
                    }
                    
                    type Item struct {
                        A int \`json:"a,omitempty"\`
                        B string \`json:"b,omitempty"\`
                        C float64 \`json:"c,omitempty"\`
                    }`
    },
];

expect.extend({
    toMatchGoStruct(received, wanted, err) {

        if (err && received['err']) {
            return {
                message: () =>
                    `Expected error : ${received['value']}`,
                pass: true,
            }
        }

        // Not not-white-space (meaning white space) but also not include \r and \n as well.
        const refiinedReceived = received['value'].replace(/[^\S]/g, '');
        const refiinedWanted = wanted.replace(/[^\S]/g, '');
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
                    `expected ------\n${received['value']}\nto be ---------\n${wanted}\n
                    ===========================
                    received:\n${refiinedReceived}\n
                    expected:\n${refiinedWanted}\n
                    `,
                pass: false,
            };
        }
    }
});

testCases.forEach((m) => {
    test(m.desc, () => expect(jsonToGoStruct(m.input, m.name)).toMatchGoStruct(m.expected, m.err));
});
