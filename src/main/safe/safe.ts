import { Generator, Ranker, solve, Pruner } from "../solver/solver";

export class CodeGenerator implements Generator<number> {

    seed: number = 0;

    setPruners(pruners: Pruner<number>[]): void {
    }

    next(): number {
        return this.seed++;
    }
    hasNext(): boolean {
        return this.seed < 1000;
    }
}