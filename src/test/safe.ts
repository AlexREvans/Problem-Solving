// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { CodeGenerator } from "../main/safe/safe";
import { solve } from "../main/solver/solver";

@suite(timeout(3000), slow(1000))
class SafeTest {

    @test incrementsDigits() {
        const codeGenerator = new CodeGenerator(3);
        
        expect(codeGenerator.nextIncrement([undefined, undefined, undefined])).to.eq(1);
        expect(codeGenerator.nextIncrement([undefined, 2, undefined])).to.eq(1);
        expect(codeGenerator.nextIncrement([2, 3, undefined])).to.eq(1);
        expect(codeGenerator.nextIncrement([undefined, undefined, 1])).to.eq(10);
        expect(codeGenerator.nextIncrement([undefined, 2, 3])).to.eq(100);
        expect(codeGenerator.nextIncrement([1, undefined, 1])).to.eq(10);
    }

    @test canGenerateSequence() {
        const codeGenerator = new CodeGenerator(3);
        expect(codeGenerator.next()).not.null;
        expect(codeGenerator.next()).not.null;
        expect(codeGenerator.next()).not.null;
    }

    matchingCode(theCode: string) {
        return candidate => candidate === theCode;
    }

    usefulFeedback(theCode: string) {
        const chars = theCode.split('');
        return candidate => ({
            indexMatches:
                chars.map((digit, index) => candidate[index] === digit)
        });
    }

    poorFeedback = candidate => ({ indexMatches: [] })


    @test canSolveWithFeedback() {

        const theCode = '521'
        const result = solve(
            new CodeGenerator(theCode.length),
            this.usefulFeedback(theCode),
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test canSolveWithPoorFeedback() {

        const theCode = '521'
        const result = solve(
            new CodeGenerator(theCode.length),
            this.poorFeedback,
            this.matchingCode(theCode));

        expect(result.solution).to.eq(theCode);
    }

    @test indexMatchingFeedback() {

        const feedback = this.usefulFeedback('4242');
        expect(feedback('1111').indexMatches).to.deep.equal([false, false, false, false]);
        expect(feedback('1211').indexMatches).to.deep.equal([false, true, false, false]);
        expect(feedback('9942').indexMatches).to.deep.equal([false, false, true, true]);
        expect(feedback('4212').indexMatches).to.deep.equal([true, true, false, true]);
        expect(feedback('4242').indexMatches).to.deep.equal([true, true, true, true]);
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
            this.poorFeedback,
            threshold);

        expect(resultWithFeedback.solutionsConsidered).to.lt(resultWithoutFeedback.solutionsConsidered);
    }

    @test canConstructCombination() {
        const codeGenerator = new CodeGenerator(3);
        expect(codeGenerator.toCombination(53)).to.eq("053");
    }
}
