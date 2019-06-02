// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { CodeGenerator, CodeFeedback } from "../main/safe/safe";
import { solve, Threshold, FeedbackSupplier } from "../main/solver/solver";

@suite
class SafeSolveTest {

    matchingCode(theCode: string): Threshold<string, any> {
        return candidate => candidate === theCode;
    }

    usefulFeedback(theCode: string): FeedbackSupplier<string, CodeFeedback> {
        const chars = theCode.split('');
        return candidate => ({
            indexMatches:
                chars.map((digit, index) => candidate[index] === digit)
        });
    }

    emptyFeedback: FeedbackSupplier<string, CodeFeedback> = candidate => ({ indexMatches: [] })




    @test canSolveWithEmptyFeedback() {
        const theCode = '521'
        const result = solve(
            new CodeGenerator(theCode.length),
            this.emptyFeedback,
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test canSolveWithFeedback() {
        const theCode = '086'
        const result = solve(
            new CodeGenerator(theCode.length),
            this.usefulFeedback(theCode),
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test canSolveVarietyOfInput() {
        const theCode = '086'
        const result = solve(
            new CodeGenerator(theCode.length),
            this.usefulFeedback(theCode),
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test performanceImprovementWithFeedback() {
        const theCode = '521'
        const threshold = this.matchingCode(theCode);

        const resultWithFeedback = solve(
            new CodeGenerator(theCode.length),
            this.usefulFeedback(theCode),
            threshold);
        const resultWithoutFeedback = solve(
            new CodeGenerator(theCode.length),
            this.emptyFeedback,
            threshold);

        expect(resultWithFeedback.solutionsConsidered).to.lt(resultWithoutFeedback.solutionsConsidered);
    }
}
