"use client";

import { useMemo, useState } from "react";
import { scenarios, sourceList, type Scenario } from "./training-data";
import {
  createInitialTrainingState,
  getPassingScore,
  getResultMessage,
  isPassingScore,
  scoreAnswer,
} from "./training-logic";

const questionCount = scenarios.length;

type BrandProps = {
  footer?: boolean;
};

function Brand({ footer = false }: BrandProps) {
  return (
    <div className={`brand${footer ? " footer-brand" : ""}`}>
      <span className="brand-symbol">
        <b>Rx</b>
      </span>
      <span>
        <strong>RxForge</strong>
        <small>Aegis Healthware</small>
      </span>
    </div>
  );
}

type HeaderProps = {
  onStartTraining: () => void;
};

function Header({ onStartTraining }: HeaderProps) {
  return (
    <>
      <div className="service-bar">
        <div className="shell">
          Educational prototype <span>•</span> Fictional patient data only
          <span>•</span> Not affiliated with any pharmacy or health system
        </div>
      </div>
      <header className="header shell">
        <a className="brand-link" href="#top" aria-label="RxForge home">
          <Brand />
        </a>
        <nav aria-label="Primary">
          <a href="#module">Module</a>
          <a href="#references">References</a>
          <button onClick={onStartTraining}>Launch training</button>
        </nav>
      </header>
    </>
  );
}

type HeroProps = {
  onStartTraining: () => void;
};

function Hero({ onStartTraining }: HeroProps) {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="overline">Module 01 · Outpatient operations</p>
          <h1>
            Make the safe call.
            <br />
            <em>Before the counter gets busy.</em>
          </h1>
          <p className="intro">
            A {questionCount}-decision practice shift for pharmacy trainees. Work
            through pickup, production, privacy, controlled-substance, and
            medication-safety situations with immediate source-backed feedback.
          </p>
          <div className="hero-actions">
            <button className="launch" onClick={onStartTraining}>
              Start practice shift <span>→</span>
            </button>
            <p>
              <strong>About 12 minutes</strong>
              <br />
              No login. Nothing is stored.
            </p>
          </div>
        </div>

        <aside className="shift-board" aria-label="Training module overview">
          <div className="board-head">
            <span>TRAINING ASSIGNMENT</span>
            <span className="status">
              <i /> READY
            </span>
          </div>
          <div className="board-title">
            <span className="clipboard-icon">Rx</span>
            <div>
              <small>RXF-OP-001</small>
              <strong>
                Outpatient safety
                <br />
                practice shift
              </strong>
            </div>
          </div>
          <dl>
            <div>
              <dt>DECISIONS</dt>
              <dd>{questionCount}</dd>
            </div>
            <div>
              <dt>WORK AREAS</dt>
              <dd>8</dd>
            </div>
            <div>
              <dt>PASS TARGET</dt>
              <dd>80%</dd>
            </div>
          </dl>
          <div className="queue-row">
            <span>Coverage</span>
            <b>FDA</b>
            <b>DEA</b>
            <b>HHS</b>
          </div>
          <p className="board-note">
            Training content is educational. Technician responsibilities vary
            by jurisdiction and must follow applicable law, pharmacist
            supervision, and pharmacy policy.
          </p>
        </aside>
      </section>

      <section className="module-strip" id="module">
        <div className="shell">
          <span>WHAT YOU&apos;LL PRACTICE</span>
          <ul>
            <li>Verify identity</li>
            <li>Catch product mismatches</li>
            <li>Protect privacy</li>
            <li>Escalate clinical questions</li>
            <li>Handle controlled-substance concerns</li>
          </ul>
        </div>
      </section>
    </>
  );
}

type ProgressRailProps = {
  currentIndex: number;
  score: number;
  complete: boolean;
};

function ProgressRail({ currentIndex, score, complete }: ProgressRailProps) {
  return (
    <aside className="trainer-rail">
      <div className="rail-heading">
        <span>MODULE 01</span>
        <strong>Practice shift</strong>
      </div>
      <div className="question-map" aria-label="Question progress">
        {scenarios.map((_, questionIndex) => (
          <span
            key={questionIndex}
            className={`${
              questionIndex < currentIndex || complete ? "done" : ""
            } ${
              questionIndex === currentIndex && !complete ? "current" : ""
            }`}
          >
            {questionIndex + 1}
          </span>
        ))}
      </div>
      <div className="rail-score">
        <small>CURRENT SCORE</small>
        <strong>
          {score}
          <span> / {questionCount}</span>
        </strong>
      </div>
      <p>
        Choose the safest next action. Each answer includes an official
        reference.
      </p>
    </aside>
  );
}

type ScenarioCardProps = {
  scenario: Scenario;
  selectedAnswer: number | null;
  isLastQuestion: boolean;
  onSelectAnswer: (answer: number) => void;
  onNextQuestion: () => void;
};

function ScenarioCard({
  scenario,
  selectedAnswer,
  isLastQuestion,
  onSelectAnswer,
  onNextQuestion,
}: ScenarioCardProps) {
  const answered = selectedAnswer !== null;
  const answeredCorrectly = selectedAnswer === scenario.correct;

  return (
    <article className="scenario">
      <p className="decision-label">DECISION REQUIRED</p>
      <h2>{scenario.title}</h2>
      <p className="detail">{scenario.detail}</p>

      <div className="options">
        {scenario.options.map((option, optionIndex) => {
          const correct = answered && optionIndex === scenario.correct;
          const wrong =
            selectedAnswer === optionIndex && optionIndex !== scenario.correct;

          return (
            <button
              key={option}
              disabled={answered}
              className={`${correct ? "correct" : ""} ${
                wrong ? "wrong" : ""
              }`}
              onClick={() => onSelectAnswer(optionIndex)}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              <b>{option}</b>
              {answered && correct && <i>✓</i>}
              {wrong && <i>×</i>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`feedback ${answeredCorrectly ? "good" : "review"}`}>
          <div className="feedback-status">
            <span>
              {answeredCorrectly ? "SAFE DECISION" : "REVIEW THIS STEP"}
            </span>
            <strong>{answeredCorrectly ? "Correct" : "Not quite"}</strong>
          </div>
          <div className="feedback-copy">
            <p>{scenario.explanation}</p>
            <a href={scenario.source.url} target="_blank" rel="noreferrer">
              <b>{scenario.source.agency}</b> {scenario.source.label} ↗
            </a>
          </div>
          <button onClick={onNextQuestion}>
            {isLastQuestion ? "View shift summary" : "Next decision"} →
          </button>
        </div>
      )}
    </article>
  );
}

type ResultsProps = {
  score: number;
  resultMessage: string;
  onRestartTraining: () => void;
};

function Results({ score, resultMessage, onRestartTraining }: ResultsProps) {
  const passed = isPassingScore(score, questionCount);

  return (
    <article className="results">
      <div className="result-number">
        <span>{Math.round((score / questionCount) * 100)}%</span>
        <small>
          {score} of {questionCount} correct
        </small>
      </div>
      <div>
        <p className="decision-label">
          SHIFT COMPLETE · {passed ? "PASSED" : "NOT PASSED"}
        </p>
        <h2>{resultMessage}</h2>
        <p>
          You completed all {questionCount} workflow decisions. Passing requires
          {` ${getPassingScore(questionCount)} of ${questionCount}`} correct.
          Review missed items using the official links shown during the module.
        </p>
        <div className="result-actions">
          <button className="launch" onClick={onRestartTraining}>
            Run module again
          </button>
          <a href="#references">Open reference desk ↓</a>
        </div>
      </div>
    </article>
  );
}

type TrainerProps = {
  currentIndex: number;
  selectedAnswer: number | null;
  score: number;
  complete: boolean;
  progress: number;
  resultMessage: string;
  onSelectAnswer: (answer: number) => void;
  onNextQuestion: () => void;
  onRestartTraining: () => void;
};

function Trainer({
  currentIndex,
  selectedAnswer,
  score,
  complete,
  progress,
  resultMessage,
  onSelectAnswer,
  onNextQuestion,
  onRestartTraining,
}: TrainerProps) {
  const scenario = scenarios[currentIndex];

  return (
    <section className="trainer-shell" id="trainer">
      <div className="trainer shell">
        <ProgressRail
          currentIndex={currentIndex}
          score={score}
          complete={complete}
        />

        <div className="work-panel">
          <div className="work-top">
            <div>
              <span className="station">
                {complete ? "SHIFT SUMMARY" : scenario.station.toUpperCase()}
              </span>
              <span className="category">
                {complete ? "Module complete" : scenario.category}
              </span>
            </div>
            <span className="counter">
              {complete
                ? `${questionCount} / ${questionCount}`
                : `${String(currentIndex + 1).padStart(2, "0")} / ${questionCount}`}
            </span>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          {complete ? (
            <Results
              score={score}
              resultMessage={resultMessage}
              onRestartTraining={onRestartTraining}
            />
          ) : (
            <ScenarioCard
              scenario={scenario}
              selectedAnswer={selectedAnswer}
              isLastQuestion={currentIndex === questionCount - 1}
              onSelectAnswer={onSelectAnswer}
              onNextQuestion={onNextQuestion}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ReferenceDesk() {
  return (
    <section className="references shell" id="references">
      <div className="reference-intro">
        <p className="overline">Reference desk</p>
        <h2>Built around primary sources.</h2>
        <p>
          Each scenario links to the government resource behind the training
          point. Pharmacy policy and state law may add requirements.
        </p>
      </div>
      <div className="reference-list">
        {sourceList.map((source, sourceIndex) => (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            key={source.label}
          >
            <span>{String(sourceIndex + 1).padStart(2, "0")}</span>
            <b className={`agency ${source.agency.toLowerCase()}`}>
              {source.agency}
            </b>
            <strong>{source.label}</strong>
            <i>↗</i>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="shell">
        <Brand footer />
        <p>
          Educational use only. Not clinical guidance.
          <br />
          All names, prescriptions, and events are fictional.
        </p>
        <p className="footer-mark">
          PROTOTYPE 01
          <br />© 2026 AEGIS HEALTHWARE
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  const initialState = createInitialTrainingState();
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    initialState.selectedAnswer,
  );
  const [score, setScore] = useState(initialState.score);
  const [complete, setComplete] = useState(initialState.complete);

  const scenario = scenarios[currentIndex];
  const answered = selectedAnswer !== null;
  const progress = useMemo(
    () =>
      ((currentIndex + (answered || complete ? 1 : 0)) / questionCount) * 100,
    [currentIndex, answered, complete],
  );

  function startTraining() {
    setStarted(true);
    setTimeout(
      () =>
        document
          .getElementById("trainer")
          ?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }

  function selectAnswer(answer: number) {
    if (answered) return;

    setSelectedAnswer(answer);
    setScore((currentScore) =>
      scoreAnswer(currentScore, answer, scenario.correct),
    );
  }

  function goToNextQuestion() {
    if (currentIndex === questionCount - 1) {
      setComplete(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
  }

  function restartTraining() {
    const restarted = createInitialTrainingState();
    setCurrentIndex(restarted.currentIndex);
    setSelectedAnswer(restarted.selectedAnswer);
    setScore(restarted.score);
    setComplete(restarted.complete);
  }

  const resultMessage = getResultMessage(score, questionCount);

  return (
    <main id="top">
      <Header onStartTraining={startTraining} />
      <Hero onStartTraining={startTraining} />

      {started && (
        <Trainer
          currentIndex={currentIndex}
          selectedAnswer={selectedAnswer}
          score={score}
          complete={complete}
          progress={progress}
          resultMessage={resultMessage}
          onSelectAnswer={selectAnswer}
          onNextQuestion={goToNextQuestion}
          onRestartTraining={restartTraining}
        />
      )}

      <ReferenceDesk />
      <Footer />
    </main>
  );
}
