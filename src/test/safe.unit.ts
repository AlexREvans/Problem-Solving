// Reference mocha-typescript's global definitions:
/// <reference path="../node_modules/mocha-typescript/globals.d.ts" />

import { expect } from "chai";
import { SafeCodeGenerator } from "../main/safe";

@suite
class SafeUnitTest {    

    @test canGenerateSequence() {
        const codeGenerator = new SafeCodeGenerator(3);
        expect(codeGenerator.nextCandidate()).not.null;
        expect(codeGenerator.nextCandidate()).not.null;
        expect(codeGenerator.nextCandidate()).not.null;
    }
}
