// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { SafeCodeGenerator, CodeFeedback } from "../main/safe";
import { solve, Threshold, FeedbackSupplier } from "../main/solver";

@suite
class SafeSolveTest {

    matchingCode(theCode: string): Threshold<string, any> {
        return candidate => candidate === theCode;
    }

    helpfulFeedbackLock(theCode: string): FeedbackSupplier<string, CodeFeedback> {
        const chars = theCode.split('');
        return candidate => ({
            indexMatches:
                chars.map((digit, index) => candidate[index] === digit)
        });
    }

    noFeedbackLock: FeedbackSupplier<string, CodeFeedback> = candidate => ({ indexMatches: [] })




    @test canSolveWithEmptyFeedback() {
        const theCode = '521487'
        const result = solve(
            new SafeCodeGenerator(theCode.length),
            this.noFeedbackLock,
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test canSolveWithFeedback() {
        const theCode = '521487'
        const result = solve(
            new SafeCodeGenerator(theCode.length),
            this.helpfulFeedbackLock(theCode),
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test performanceImprovementWithFeedback() {
        const theCode = '521'
        const threshold = this.matchingCode(theCode);

        const resultWithFeedback = solve(
            new SafeCodeGenerator(theCode.length),
            this.helpfulFeedbackLock(theCode),
            threshold);
        const resultWithoutFeedback = solve(
            new SafeCodeGenerator(theCode.length),
            this.noFeedbackLock,
            threshold);

        expect(resultWithFeedback.solutionsConsidered).to.be.lessThan(resultWithoutFeedback.solutionsConsidered);
    }
}
