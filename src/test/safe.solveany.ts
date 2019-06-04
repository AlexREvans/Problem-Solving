// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { SafeCodeGenerator, CodeFeedback } from "../main/safe";
import { solve, FeedbackSupplier, Threshold } from "../main/solver";


const usefulFeedback = function (theCode: string): FeedbackSupplier<string, CodeFeedback> {
    const chars = theCode.split('');
    return candidate => ({
        indexMatches:
            chars.map((digit, index) => candidate[index] === digit)
    });
};

const matchingCode = function (theCode: string): Threshold<string, any> {
    return candidate => candidate === theCode;
};

describe("Solving for different inputs", () => {
    [
        '5352',
        '432',
        '43',
        '41',
        '115',
        '46242',
        '110032'
    ].forEach(theCode => {
        it("can solve for " + theCode, () => {
            const result = solve(
                new SafeCodeGenerator(theCode.length),
                usefulFeedback(theCode),
                matchingCode(theCode));

            expect(result.solution).to.eq(theCode);
        })
    })
});