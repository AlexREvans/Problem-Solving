export interface Generator<T> {
    next(): T;
    hasNext(): boolean;
    setPruners(pruners: Pruner<T>[]): void;
}

export type Pruner<T> = (solution: T) => boolean;

export type Ranker<T> = (solution: T) => number;

export function solve<U>(gen: Generator<U>, ranker: Ranker<U>, bailout: ((obj: U, rank: number) => boolean)): U {
    while (gen.hasNext()) {
        const u = gen.next();
        const rank = ranker(u);
        if (bailout(u, rank)) {
            return u;
        }
    }
    return null;
}