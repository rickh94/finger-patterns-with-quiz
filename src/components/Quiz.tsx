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
  const [results, setResults] = useState<QuizResultsInfo>({
    ...quizResultsBlank,
  });

  function clearResults() {
    setResults({
      correct: 0,
      incorrect: 0,
      missed: {
        violinString: {
          E: 0,
          A: 0,
          D: 0,
          G: 0,
        },
        patternId: {
          oneTwo: 0,
          twoThree: 0,
          threeFour: 0,
          wholeSteps: 0,
          halfSteps: 0,
        },
        patternPosition: {
          low: 0,
          normal: 0,
          high: 0,
        },
      },
    });
  }

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
              clearResults={clearResults}
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
              setQuizQuestions={setQuizQuestions}
              clearResults={clearResults}
            />
          ),
        }[mode]
      }
    </>
  );
}
