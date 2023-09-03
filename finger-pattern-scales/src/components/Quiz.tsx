import {
  QuizMode,
  type QuizSettings,
  type QuestionInfo,
  type QuizResultsInfo,
  quizDefaults,
  quizResultsBlank,
} from './quiz/common.ts';
import QuizSetup from './quiz/modes/QuizSetup.tsx';
import QuizResults from './quiz/modes/QuizResults.tsx';
import TakingQuiz from './quiz/modes/TakingQuiz.tsx';
import { useState } from 'preact/hooks';

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode>(QuizMode.Results);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(quizDefaults);
  const [quizQuestions, setQuizQuestions] = useState<QuestionInfo[]>([]);
  // const [results, setResults] = useState<QuizResultsInfo>(quizResultsBlank);
  const [results, setResults] = useState<QuizResultsInfo>({
    correct: 5,
    incorrect: 5,
    missed: {
      violinString: {
        E: 2,
        A: 0,
        D: 3,
        G: 0,
      },
      patternId: {
        oneTwo: 0,
        twoThree: 1,
        threeFour: 0,
        wholeSteps: 1,
        halfSteps: 2,
      },
      patternPosition: {
        low: 2,
        normal: 1,
        high: 1,
      },
    },
  });

  return (
    // this is a jsx switch case hack. why don't i like jsx?
    <>
      {
        {
          [QuizMode.Setup]: (
            <QuizSetup
              setMode={setMode}
              quizSettings={quizSettings}
              setQuizSettings={setQuizSettings}
              setQuizQuestions={setQuizQuestions}
            />
          ),
          [QuizMode.Taking]: (
            <TakingQuiz
              setMode={setMode}
              questions={quizQuestions}
              quizSettings={quizSettings}
              setResults={setResults}
            />
          ),
          [QuizMode.Results]: (
            <QuizResults
              setMode={setMode}
              results={results}
              quizSettings={quizSettings}
            />
          ),
        }[mode]
      }
    </>
  );
}
