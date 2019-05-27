import { Generator, Ranker, solve, Pruner } from "../solver/solver";

export class CodeGenerator implements Generator<number> {
    setPruners(pruners: Pruner<number>[]): void {
    }
    
    next(): number {
        return 3;
    }
    hasNext(): boolean {
        return false;
    }
}