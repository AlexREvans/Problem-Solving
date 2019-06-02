import { Generator } from "../solver/solver";

export class CodeGenerator implements Generator<string, { indexMatches: boolean[] }> {

    knownPositions: string[] = [];
    seed: number = 0;
    combinationLength:number;
    increment: number = 1;

    constructor(combinationLength: number) {
        this.combinationLength = combinationLength;
        this.knownPositions = Array(combinationLength).fill(null);
    }

    feedback(candidate: string, feedback: { indexMatches: boolean[] }): void {
        const correctIndicies = feedback.indexMatches
            .map((value, index) => ({ value, index }))
            .filter(vi => vi.value)
            .map(vi => vi.index);

        correctIndicies.forEach(index => this.knownPositions[index] = candidate[index]);
        this.increment = Math.pow(10, this.combinationLength -1 - this.knownPositions.lastIndexOf(null));
    }

    toCombination(n: number) {
        return ('' + n).padStart(this.combinationLength, "0");
    }

    knownDigits() {
        return this.knownPositions.filter(v => v !== null).length;
    }

    next(): string {
        this.seed += this.increment;
        return this.toCombination(this.seed);
    }

    hasNext(): boolean {
        return this.seed < 1000 || this.knownDigits() !== this.combinationLength;
    }

}
