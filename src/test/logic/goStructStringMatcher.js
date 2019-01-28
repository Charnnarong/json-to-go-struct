const R = require('ramda');

/**
 *
 input:
 ------------------
 type Aaa struct {
        a xxx yyy
        b xxx yyy
        c xxx yyy
    }
 
 output:
 ------------------
 {
  "Aaa": {
    "a": {
      "type": "xxx",
      "key": "yyy"
    },
    "b": {
      "type": "xxx",
      "key": "yyy"
    },
    "c": {
      "type": "xxx",
      "key": "yyy"
    }
  }
}
 * @param receivedElement
 */
function parseGoStructTextToJsonObject(receivedElement) {

    const tokens = receivedElement.replace(/{}/, "{ }").split(/\s/).filter(x => x !== "");
    let result = {};
    let typeStack = [];
    let keyStack = []; // for go's struct type name.
    let memberItem = {};
    let structStack = []; // for "struct" , "{" and "}"
    let memberKeyStack = [];
    let memberTypeStack = [];
    let memberJsonNameStack = [];

    tokens.forEach(token => {
        if (typeStack.length == 0 && token == "type") {
            typeStack.push(token);
            return;
        }
        if (keyStack.length == 0) {
            keyStack.push(token);
            return;
        }
        if (token == "struct" && structStack.length == 0) {
            structStack.push(token);
            return;
        }
        if (token.includes("{") && structStack.length > 0) {
            structStack.push(token);
            return;
        }
        if (token.includes("}")) {
            result[keyStack.pop()] = memberItem;
            memberItem = {};
            structStack = [];
            keyStack = [];
            typeStack = [];
            return;
        }
        if (memberKeyStack.length == 0) {
            memberKeyStack.push(token);
            return;
        }
        if (memberTypeStack.length == 0) {
            memberTypeStack.push(token);
            return;
        }
        if (memberJsonNameStack.length == 0) {
            memberJsonNameStack.push(token);

            let memberMeta = {"type": memberTypeStack.pop(), "key": memberJsonNameStack.pop()};
            let memberKey = memberKeyStack.pop();
            memberItem[memberKey] = memberMeta;
            return;

        }
    });

    return result;
}

function toMatchGoStruct(received, wanted, err) {

    if (err && received['err']) {
        return {
            message: () =>
                `Expected error : ${received['value']}`,
            pass: true,
        }
    }

    // Not not-white-space (meaning white space) but also not include \r and \n as well.
    const receiveObj = parseGoStructTextToJsonObject(received['value']); // received['value'].replace(/[^\S]/g, '');
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
                `expected ------\n${received['value']}\nto be ---------\n${wanted}\n
                    ===========================
                    received:\n${ JSON.stringify(receiveObj)}\n
                    expected:\n${JSON.stringify(wantedObj)}\n
                    `,
            pass: false,
        };
    }
}

export default toMatchGoStruct