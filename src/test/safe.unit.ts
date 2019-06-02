// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { CodeGenerator } from "../main/safe/safe";

@suite
class SafeUnitTest {    

    @test canGenerateSequence() {
        const codeGenerator = new CodeGenerator(3);
        expect(codeGenerator.next()).not.null;
        expect(codeGenerator.next()).not.null;
        expect(codeGenerator.next()).not.null;
    }

    @test canConstructCombination() {
        const codeGenerator = new CodeGenerator(3);
        expect(codeGenerator.toCombination(53)).to.eq("053");
    }
}
