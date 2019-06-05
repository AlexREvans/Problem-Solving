import { Generator } from "./solver";

export type CodeFeedback = { indexMatches: boolean[] };

export class SafeCodeGenerator implements Generator<string, CodeFeedback> {

    knownPositions: string[];
    combinationLength: number;

    seed: number = -1;
    increment: number = 1;

    constructor(combinationLength: number) {
        this.combinationLength = combinationLength;
        this.knownPositions = Array(combinationLength).fill(null);
    }

    nextCandidate(): string {
        this.seed += this.increment;
        return this.toCombination(this.seed);
    }

    hasNextCandidate(): boolean {
        const knownDigits = this.knownPositions.filter(v => v !== null).length;
        const allDigitsKnown = knownDigits !== this.combinationLength;
        const noSolutionFound = (this.seed + '').length <= this.combinationLength;
        return allDigitsKnown || noSolutionFound;
    }

    receiveFeedback(candidate: string, feedback: CodeFeedback): void {
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
