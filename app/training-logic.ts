export type TrainingState = {
  currentIndex: number;
  selectedAnswer: number | null;
  score: number;
  complete: boolean;
};

export function getPassingScore(questionCount: number): number {
  return Math.ceil(questionCount * 0.8);
}

export function isPassingScore(score: number, questionCount: number): boolean {
  return score >= getPassingScore(questionCount);
}

export function getResultMessage(score: number, questionCount: number): string {
  const passingScore = getPassingScore(questionCount);

  if (score >= Math.max(passingScore, questionCount - 2)) {
    return "Passed · Safety-ready";
  }
  if (score >= passingScore) {
    return "Passed · Strong working foundation";
  }
  if (score >= Math.ceil(questionCount * (2 / 3))) {
    return "Not passed · Review key decisions";
  }
  if (score >= Math.ceil(questionCount * 0.47)) {
    return "Not passed · Developing consistency";
  }
  return "Not passed · Review recommended";
}

export function scoreAnswer(
  currentScore: number,
  selectedAnswer: number,
  correctAnswer: number,
): number {
  return currentScore + (selectedAnswer === correctAnswer ? 1 : 0);
}

export function createInitialTrainingState(): TrainingState {
  return {
    currentIndex: 0,
    selectedAnswer: null,
    score: 0,
    complete: false,
  };
}
