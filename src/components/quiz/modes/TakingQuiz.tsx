import { useState } from 'preact/hooks';
import {
  QuizMode,
  type QuestionInfo,
  type QuizResultsInfo,
  type QuizSettings,
  type PatternId,
} from '../common';
import QuizQuestion from '../components/QuizQuestion';

export default function TakingQuiz({
  setMode,
  questions,
  setResults,
  quizSettings,
}: {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  questions: QuestionInfo[];
  setResults: any;
}) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);

  function recordAnswer(answer: PatternId) {
    setCanAdvance(true);
    setResults((oldResults: QuizResultsInfo) => {
      if (questions[currentQuestionIdx]?.patternId === answer) {
        return {
          correct: oldResults.correct + 1,
          incorrect: oldResults.incorrect,
          missed: oldResults.missed,
        };
      } else {
        const newMissed = oldResults.missed;
        const question = questions[currentQuestionIdx];

        if (!question) {
          return oldResults;
        }
        newMissed.violinString[question.violinString] += 1;
        newMissed.patternId[question.patternId] += 1;
        newMissed.patternPosition[question.patternPosition] += 1;
        return {
          correct: oldResults.correct,
          incorrect: oldResults.incorrect + 1,
          missed: newMissed,
        };
      }
    });
  }

  function advanceQuestion() {
    if (!canAdvance) {
      return;
    }
    setCurrentQuestionIdx(currentQuestionIdx + 1);
    if (currentQuestionIdx >= questions.length - 1) {
      setMode(QuizMode.Results);
    }
    setCanAdvance(false);
  }

  return (
    <>
      <QuizQuestion
        questionNumber={currentQuestionIdx + 1}
        question={questions[currentQuestionIdx]!}
        recordAnswer={recordAnswer}
        canAdvance={canAdvance}
        advanceQuestion={advanceQuestion}
        quizSettings={quizSettings}
      />
    </>
  );
}
