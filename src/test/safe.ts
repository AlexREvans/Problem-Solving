// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { CodeGenerator } from "../main/safe/safe";
import { solve } from "../main/solver/solver";

@suite(timeout(3000), slow(1000))
class SafeTest {
    @test canGenerateSequence() {
        const codeGenerator = new CodeGenerator();
        expect(codeGenerator.next()).not.null;
    }

    @test canSolve() {

        const threshold = (candidate, f) => candidate === '541';
        const feedback = candidate => ({indexMatches : []});

        const result = solve(
            new CodeGenerator(),
            feedback,
            threshold);
        
            expect(result).to.eq('541');
    }

    @test canConstructComination() {
        const codeGenerator = new CodeGenerator();
        expect(codeGenerator.toCombination(53)).to.eq("053");
    }
}