import assert from "node:assert/strict";
import test from "node:test";

import { scenarios } from "../app/training-data.ts";

const originalCorrectAnswers = new Map([
  ["Two profiles share the same name and ZIP code.", "Verify full name and date of birth before choosing a profile"],
  ["Two cartons look almost identical.", "Stop and compare the prescription, NDC, strength, and dosage form before continuing"],
  ["The strength on the image is difficult to read.", "Place the prescription on hold and give it to the pharmacist for clarification"],
  ["A patient asks about ibuprofen and a new anticoagulant.", "Refer the clinical question to the pharmacist"],
  ["The required Medication Guide is missing.", "Pause pickup and provide the required Medication Guide before completing the sale"],
  ["A patient reports a serious unexpected reaction.", "Notify the pharmacist promptly and follow the adverse-event reporting procedure"],
  ["A controlled prescription presents multiple red flags.", "Pause the fill and give the pharmacist all relevant facts"],
  ["A patient requests an early controlled-substance fill.", "Leave the prescription unchanged and refer the request to the pharmacist"],
  ["The controlled count does not reconcile.", "Stop unexplained handling of the affected stock and notify the pharmacist-in-charge"],
  ["A patient brings back unused opioid tablets.", "Recommend an authorized take-back option and follow site-specific collection rules"],
  ["A brother calls about a sensitive prescription.", "Do not disclose independently; follow the pharmacy's verification process"],
  ["The waiting area can hear the conversation.", "Move the conversation to the pharmacy's available private area"],
  ["The bag and register show different patients.", "Stop the sale, verify the patient, and correct the identity mismatch"],
  ["A refrigerated delivery arrived outside its expected range.", "Separate it from usable inventory and notify the pharmacist or inventory lead"],
  ["A label was applied to the wrong stock bottle.", "Stop the item, notify the pharmacist, correct the bottle, and document the near miss"],
]);

test("scenario answer positions are valid, balanced, and retain the original correct answers", () => {
  assert.equal(scenarios.length, 15);
  assert.equal(originalCorrectAnswers.size, 15);

  const positionCounts = [0, 0, 0];

  for (const scenario of scenarios) {
    assert.ok(
      Number.isInteger(scenario.correct) &&
        scenario.correct >= 0 &&
        scenario.correct < scenario.options.length,
      `${scenario.title} has an invalid correct index`,
    );
    assert.equal(scenario.options.length, 3, `${scenario.title} must have A, B, and C choices`);
    assert.ok(scenario.explanation.trim(), `${scenario.title} must have an explanation`);
    assert.ok(scenario.visual.icon.trim(), `${scenario.title} must have a visual icon`);
    assert.ok(scenario.visual.label.trim(), `${scenario.title} must have a visual label`);
    assert.ok(scenario.visual.caption.trim(), `${scenario.title} must have a visual caption`);
    assert.equal(scenario.feedback.length, scenario.options.length, `${scenario.title} must have feedback for every choice`);
    scenario.feedback.forEach((feedback, answerIndex) => {
      assert.ok(feedback.why.trim(), `${scenario.title} answer ${answerIndex + 1} must explain why`);
      assert.ok(feedback.consequence.trim(), `${scenario.title} answer ${answerIndex + 1} must explain the consequence`);
    });
    const sourceUrl = new URL(scenario.source.url);
    assert.equal(sourceUrl.protocol, "https:", `${scenario.title} must use HTTPS`);
    assert.ok(
      sourceUrl.hostname.endsWith(".gov"),
      `${scenario.title} must reference a government source`,
    );
    assert.equal(
      scenario.options[scenario.correct],
      originalCorrectAnswers.get(scenario.title),
      `${scenario.title} no longer points to its original correct answer`,
    );
    positionCounts[scenario.correct] += 1;
  }

  assert.deepEqual(positionCounts, [5, 5, 5]);
  assert.equal(new Set(scenarios.map((scenario) => scenario.visual.label)).size, 15);
});
