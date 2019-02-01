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
        if (typeStack.length === 0 && token === "type") {
            typeStack.push(token);
            return;
        }
        if (keyStack.length === 0) {
            keyStack.push(token);
            return;
        }
        if ((token === "struct" || token === "[]struct") && structStack.length === 0) {
            structStack.push(token);
            return;
        }
        if (token.includes("{") && structStack.length > 0) {
            return;
        }
        if (token === "}") {
            result[keyStack.pop()] = {"members": memberItem, "type": structStack.pop()};
            memberItem = {};
            structStack = [];
            keyStack = [];
            typeStack = [];
            return;
        }
        if (memberKeyStack.length === 0) {
            memberKeyStack.push(token);
            return;
        }
        if (memberTypeStack.length === 0) {
            memberTypeStack.push(token);
            return;
        }
        if (memberJsonNameStack.length === 0) {
            memberJsonNameStack.push(token);

            const memberMeta = {"type": memberTypeStack.pop(), "jsonName": memberJsonNameStack.pop()};
            const memberKey = memberKeyStack.pop();
            memberItem[memberKey] = memberMeta;
        }
    });

    return result;
}

export default parseGoStructTextToJsonObject;
