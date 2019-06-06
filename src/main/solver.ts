export interface Generator<ANSWER, FEEDBACK> {
    nextCandidate(): ANSWER;
    hasNextCandidate(): boolean;
    receiveFeedback(candidate: ANSWER, feedback: FEEDBACK): void;
}

export type FeedbackSupplier<ANSWER, FEEDBACK> =
    (candidate: ANSWER) => FEEDBACK

export type Threshold<ANSWER, FEEDBACK> =
    (answer: ANSWER, feedback: FEEDBACK) => boolean;

export type AnswerWithStats<ANSWER> =
    { answer: ANSWER, answersConsidered: number }





export function findAnswer<ANSWER, FEEDBACK>(
    gen: Generator<ANSWER, FEEDBACK>,
    feedbackSupplier: FeedbackSupplier<ANSWER, FEEDBACK>,
    threshold: Threshold<ANSWER, FEEDBACK>): AnswerWithStats<ANSWER> {

    var answersConsidered = 0;

    while (gen.hasNextCandidate()) {

        /* STEP 1 - ABILITY TO GENERATE ANSWERS */
        const answer: ANSWER = gen.nextCandidate();
        answersConsidered += 1;

        /* STEP 2 - ABILITY TO ASSESS ANSWERS */
        const feedback: FEEDBACK = feedbackSupplier(answer);
        if (threshold(answer, feedback)) {
            return { answer: answer, answersConsidered: answersConsidered }
        }

        /* STEP 3 - ABILITY TO PROCESS FEEDBACK */
        gen.receiveFeedback(answer, feedback);
    }

    return { answer: null, answersConsidered: answersConsidered };
}