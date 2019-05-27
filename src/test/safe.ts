import { assert } from "chai";
import { CodeGenerator } from "../main/safe/safe";
import { Pruner } from "../main/solver/solver";

// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

@suite(timeout(3000), slow(1000))
class SafeTest {
    @test canGenerateSequence() {
        const codeGenerator = new CodeGenerator();
        assert.equal(codeGenerator.next(), 3);
    }
}