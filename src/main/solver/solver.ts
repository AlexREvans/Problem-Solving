export interface Generator<T, F> {
    next(): T;
    hasNext(): boolean;
    feedback(candidate: T, feedback: F): void;
}

export function solve<T, F>(
    gen: Generator<T, F>,
    ranker: (candidate: T) => F,
    threshold: (candidate: T, feedback: F) => boolean): { solution: T, solutionsConsidered: number } {

    var solutionsConsidered = 0;

    while (gen.hasNext()) {
        const u = gen.next();
        solutionsConsidered += 1;
        const rank = ranker(u);
        if (threshold(u, rank)) {
            return { solution: u, solutionsConsidered }
        }
        gen.feedback(u, rank);
    }
    return {solution: null, solutionsConsidered};
}