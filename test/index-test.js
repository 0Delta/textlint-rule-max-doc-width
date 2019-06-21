"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "text"
    ],
    invalid: [
        // single match
        {
            text: "long",
            options: {
                max: 2
            },
            errors: [{
                message: "Line is too long(now width: 4).",
                line: 1
            }]
        },
        // multiple match
        {
            text: `long
long?
longer
longest`,
            options: {
                max: 5
            },
            errors: [{
                    message: "Line is too long(now width: 6).",
                    line: 3
                },
                {
                    message: "Line is too long(now width: 7).",
                    line: 4
                }
            ]
        },
        // ShiftJIS
        {
            text: "長い",
            options: {
                max: 2
            },
            errors: [{
                message: "Line is too long(now width: 4).",
                line: 1
            }]
        },
    ]
});