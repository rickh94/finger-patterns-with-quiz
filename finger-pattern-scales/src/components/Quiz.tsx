import {
  QuizMode,
  type QuizSettings,
  type QuizQuestion,
  quizDefaults,
} from "./quiz/common.ts";
import QuizSetup from "./quiz/modes/QuizSetup.tsx";
import QuizResults from "./quiz/modes/QuizResults.tsx";
import TakingQuiz from "./quiz/modes/TakingQuiz.tsx";
import { useState } from "preact/hooks";

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode>(QuizMode.Setup);
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(quizDefaults);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(
    null,
  );
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
            />
          ),
          [QuizMode.Results]: <QuizResults setMode={setMode} />,
          [QuizMode.Taking]: (
            <TakingQuiz setMode={setMode} quizSettings={quizSettings} />
          ),
        }[mode]
      }
    </>
  );
}
