export interface Generator<T, F> {
    next(): T;
    hasNext(): boolean;
    feedback(candidate: T, feedback: F): void;
}

export function solve<T, F>(
    gen: Generator<T, F>,
    ranker: (candidate: T) => F,
    threshold: (candidate: T, feedback: F) => boolean): T {
    while (gen.hasNext()) {
        const u = gen.next();
        const rank = ranker(u);
        if (threshold(u, rank)) {
            return u;
        }
        gen.feedback(u, rank);
    }
    return null;
}