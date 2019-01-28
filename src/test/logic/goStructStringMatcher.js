function toMatchGoStruct(received, wanted, err) {

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

export default toMatchGoStruct