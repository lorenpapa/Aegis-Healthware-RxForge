import assert from "node:assert/strict";
import test from "node:test";

import { scenarios } from "../app/training-data.ts";
import {
  createInitialTrainingState,
  getPassingScore,
  getResultMessage,
  isPassingScore,
  scoreAnswer,
} from "../app/training-logic.ts";

test("passing begins at 12 of 15", () => {
  assert.equal(getPassingScore(scenarios.length), 12);
  assert.equal(isPassingScore(11, scenarios.length), false);
  assert.equal(isPassingScore(12, scenarios.length), true);
  assert.match(getResultMessage(11, scenarios.length), /^Not passed/);
  assert.match(getResultMessage(12, scenarios.length), /^Passed/);
});

test("scoring increments only for a correct answer", () => {
  assert.equal(scoreAnswer(4, 1, 1), 5);
  assert.equal(scoreAnswer(4, 0, 1), 4);
});

test("restart returns the training session to its initial state", () => {
  assert.deepEqual(createInitialTrainingState(), {
    currentIndex: 0,
    selectedAnswer: null,
    score: 0,
    complete: false,
  });
});
