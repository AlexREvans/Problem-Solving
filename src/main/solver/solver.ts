export interface Generator<SOLUTION, FEEDBACK> {
    next(): SOLUTION;
    hasNext(): boolean;
    receiveFeedback(candidate: SOLUTION, feedback: FEEDBACK): void;
}
export type FeedbackSupplier<SOLUTION, FEEDBACK> = (candidate: SOLUTION) => FEEDBACK
export type Threshold<SOLUTION, FEEDBACK> = (candidate: SOLUTION, feedback: FEEDBACK) => boolean;
export type SolutionWithStats<SOLUTION> = { solution: SOLUTION, solutionsConsidered: number }

export function solve<SOLUTION, FEEDBACK>(
    gen: Generator<SOLUTION, FEEDBACK>,
    feedbackSupplier: FeedbackSupplier<SOLUTION, FEEDBACK>,
    threshold: Threshold<SOLUTION, FEEDBACK>): SolutionWithStats<SOLUTION> {

    var solutionsConsidered = 0;

    while (gen.hasNext()) {
        const solution = gen.next();
        solutionsConsidered += 1;
        const feedback = feedbackSupplier(solution);
        if (threshold(solution, feedback)) {
            return { solution, solutionsConsidered }
        }
        gen.receiveFeedback(solution, feedback);
    }
    return { solution: null, solutionsConsidered };
}