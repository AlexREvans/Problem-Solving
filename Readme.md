# A Pattern for Problem Solving

Broad approach defined by types and algorithm in [solver.ts](./src/main/solver/solver.ts).

   1. Identify how to draw solutions (`next()`/`hasNext()`)
   1. Identify useful feedback (`FEEDBACK`) on the viability of a solution, and how to measure (`FeedbackSupplier`)
   1. Identify how to factor feedback into drawing process (`receiveFeedback`)
