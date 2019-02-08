import parseGoStructTextToJsonObject from "./parseGoStructTextToJsonObject";

const R = require('ramda');

function toMatchGoStruct(received, wanted, err) {

    if (err && received['err']) {
        return {
            message: () =>
                `Expected error : ${received['value']}`,
            pass: true,
        }
    }

    const receiveObj = parseGoStructTextToJsonObject(received['value']);
    const wantedObj = parseGoStructTextToJsonObject(wanted);
    wanted.replace(/[^\S]/g, '');

    const pass = R.equals(receiveObj, wantedObj);

    if (pass) {
        return {
            message: () =>
                `expected ------\n${received['value']}\nto be ---------\n${wanted}\n`,
            pass: true,
        }
    } else {
        return {
            message: () =>
                `\nExpected: \n\n${wanted}\n\n` +
                `Received: \n\n${received['value']}\n\n` +
                "================================\n"+
                `\nExpected: \n${JSON.stringify(wantedObj)}\n\n` +
                `Received: \n${JSON.stringify(receiveObj)}\n\n`,
            pass: false,
        };
    }
}

export default toMatchGoStruct
