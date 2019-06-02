import { Generator } from "../solver/solver";

export type CodeFeedback = { indexMatches: boolean[] };

export class CodeGenerator implements Generator<string, CodeFeedback> {

    knownPositions: string[];
    combinationLength: number;
    
    seed: number = 0;
    increment: number = 1;

    constructor(combinationLength: number) {
        this.combinationLength = combinationLength;
        this.knownPositions = Array(combinationLength).fill(null);
    }

    next(): string {
        this.seed += this.increment;
        return this.toCombination(this.seed);
    }

    hasNext(): boolean {
        const knownDigits = this.knownPositions.filter(v => v !== null).length;
        return knownDigits !== this.combinationLength || (this.seed + '').length <= this.combinationLength;
    }

    receiveFeedback(candidate: string, feedback: { indexMatches: boolean[] }): void {
        const correctIndicies = feedback.indexMatches
            .map((value, index) => ({ value, index }))
            .filter(vi => vi.value)
            .map(vi => vi.index);

        correctIndicies.forEach(index => this.knownPositions[index] = candidate[index]);
        this.increment = Math.pow(10, this.combinationLength - 1 - this.knownPositions.lastIndexOf(null));
    }

    toCombination(n: number) {
        return ('' + n).padStart(this.combinationLength, "0");
    }
}
