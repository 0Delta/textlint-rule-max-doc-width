// LICENSE : MIT
"use strict";
const ObjectAssign = require("object-assign");
const defaultOptions = {
    max_width: 120
};
String.prototype.bytes = function () {
    var length = 0;
    for (var i = 0; i < this.length; i++) {
        var c = this.charCodeAt(i);
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
            length += 1;
        } else {
            length += 2;
        }
    }
    return length;
};
module.exports = function (context, options = defaultOptions) {
    options = ObjectAssign({}, defaultOptions, options);
    const max = options.max_width;
    const {
        Syntax,
        RuleError,
        report,
        getSource
    } = context;
    return {
        [Syntax.Document](node) {
            const text = getSource(node).split("\n");
            for (const key in text) {
                // console.log(key)
                if (text.hasOwnProperty(key)) {
                    const elem = text[key];
                    const len = elem.bytes();
                    // console.log(elem)
                    // console.log(len)
                    if (len > max) {
                        report(node, new RuleError(`Line is too long(now width: ${len}).`, {
                            line: parseInt(key)
                        }));
                    }
                }
            }
        }
    }
};
