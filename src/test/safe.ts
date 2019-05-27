// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { assert, expect } from "chai";
import { CodeGenerator } from "../main/safe/safe";
import { Pruner, solve } from "../main/solver/solver";

@suite(timeout(3000), slow(1000))
class SafeTest {
    @test canGenerateSequence() {
        const codeGenerator = new CodeGenerator();
        expect(codeGenerator.next()).not.null;
    }

    @test canSolve() {
        const result = solve(
            new CodeGenerator(),
            num => num,
            (o, rnk) => rnk > 25);
        expect(result).to.eq(26);
    }
}