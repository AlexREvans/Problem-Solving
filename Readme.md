# A Pattern for Problem Solving

This project was built to support a lightning talk at [BlueConf 2019](https://blueconf.co.uk/).

A pattern for problem solving describes an approach to breakdown and tackle complex "find x" style requirements. An example would be booking a package holiday:

   * Can I get flights when I want to travel?
   * Which hotels are available at my destination?
   * Are the activities that I'd like to do available?
   * What's the weather going to be like whilst I'm there?

Whilst this repository demonstrates a technical application, the general structure described can be applied to a variety of problems.

## Using this project

   * Requires `docker` & `docker-compose`
   * The tests can be run by running `./run.sh npm install` followed by `./run.sh npm run test`
   * The presentation can be viewed by running `./run.sh npm install` followed by `./present.sh` (uses python to host presentation)

## Three steps to problem solving

   1. Ability to generate answers

The first step is to understand the solution space and where answers can be drawn from. 

Laziness is king here. The solution space may can be very large and it's not always practical to enumerate all posible answers. Understanding how to draw from the solution space (and draw order) will likely have significant impact on the number of considerations made before a solution is found. 

An example would be rolling 2 dice - the solution space may be the sum of both dice [2..12], but 7 is the most likely sum. It'd make sense to consider 7 before 12.

   2. Ability to assess answers

Once we've understood the solution space, we need to understand how to evaluate each answer from 2 perspectives 

   * Does it meet our threshold/criteria?
   * Can it provide feedback to narrow our solution space?

   3. Ability to process feedback

Once an answer has been assessed, can we use the information to narrow our solution space and update our generation process to more quickly find a suitable answer?

To continue the 2 dice example, if one of the two values were to be revealed, then our solution space would be reduced to $knownvalue+[1..6].

# Implementation

## [Solver - Pattern Definition](./src/main/solver.ts)

This file describes the implementation of the pattern and is split into 2 sections:

   * Types and definitions that express the concepts above
   * A function which works through definitions to find an answer

## [Combination-Lock Cracker](./src/main/safe.ts)

This file describes an implementation of the pattern above that can be used to "crack" a combination lock of digits. 

   * Example combinations would be "1241" or "41214" or "141111100" or "9999"

Where possible, if the lock provides feedback on correct digits, the cracker can narrow the solution space by retaining correct guesses. For instance, if I were to guess 1231 and find the third and fourth digits are correct, then I'd only guess ??31 from that point on.

## [Solution Demonstration Tests](./src/test/safe.solve.ts)

Here, we have

   * An understanding of the solution space and a way of generating digit combinations through [the `SafeCodeGenerator` class](./src/main/safe.ts)
   * A way of assessing answers matches the correct code through the `matchingCode` `Threshold` function
   * Ways of providing feedback 
      * A lock which gives no feedback - `noFeedbackLock` 
      * A lock which tells of correct digits - `helpfulFeedbackLock`

The subsequent tests illustrate that answers can be generated and tested against the threshold function. 

An answer can be found whether or not the lock provides feedback but, with consideration for how we can narrow the solutions space where information is available, we can reduce the number of considerations by narrowing our solution space.


## In the Wild?

   * Recurrent Neural Networks
   * Agile improvement - scrum sprints/goals/retrospectives