import parseGoStructTextToJsonObject from "./parseGoStructTextToJsonObject";

const R = require('ramda');

test("parse simple Test ", () => {
    const input = "type Abc []struct {\n  Name\tint\t`json:\"name\"`\n  Surname\tfloat64\t`json:\"surname\"`\n}\n\n";
    const expected = {
        "Abc": {
            "type": "[]struct",
            "members": {
                "Name": {
                    "type": "int",
                    "jsonName": "`json:\"name\"`"
                },
                "Surname": {
                    "type": "float64",
                    "jsonName": "`json:\"surname\"`"
                }
            }
        }

    };
    const result = parseGoStructTextToJsonObject(input);
    expect(R.equals(expected,result)).toBeTruthy();

});

