import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { QuizMode, type QuizSettings, type QuestionInfo } from "../common.ts";
import generateQuiz from "../generateQuiz.ts";
import { CogIcon, ListBulletIcon } from "@heroicons/react/24/solid";

type QuizSplashProps = {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  setQuizQuestions: (quizQuestions: QuestionInfo[]) => void;
  clearResults: () => void;
};
export default function QuizSplash({
  setMode,
  quizSettings,
  setQuizQuestions,
  clearResults,
}: QuizSplashProps) {
  function startTaking() {
    const questions = generateQuiz(quizSettings);
    setQuizQuestions(questions);
    clearResults();
    setMode(QuizMode.Taking);
  }
  return (
    <>
      <h2 class="mb-4 text-2xl">Practice Quiz</h2>
      <p class="mb-4">
        Select below to start taking the quiz immediately with the default
        settings or customize the length and question difficulty.
      </p>
      <div class="mb-4 flex flex-col gap-6 sm:flex-row-reverse">
        <button
          type="button"
          onClick={() => startTaking()}
          className="btn-lg flex-1 justify-center bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Start Now
          <ListBulletIcon className="-mr-1 size-6" />
        </button>
        <button
          type="button"
          onClick={() => setMode(QuizMode.Setup)}
          className="btn-lg flex-1 justify-center bg-fuchsia-600 text-white hover:bg-fuchsia-500"
        >
          <CogIcon className="-ml-1 size-6" />
          Customize
        </button>
      </div>
    </>
  );
}
