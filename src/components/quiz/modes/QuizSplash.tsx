import { QuizMode, type QuizSettings, type QuestionInfo } from "../common.ts";
import generateQuiz from "../generateQuiz.ts";

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
      <div class="mb-4 flex flex-col gap-6 sm:flex-row">
        <button
          type="button"
          onClick={() => startTaking()}
          className="flex-1 rounded-md bg-emerald-600 px-5 py-3 text-lg font-bold tracking-wide text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Start Now
        </button>
        <button
          type="button"
          onClick={() => setMode(QuizMode.Setup)}
          className="flex-1 rounded-md bg-fuchsia-600 px-5 py-3 text-lg font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Customize
        </button>
      </div>
    </>
  );
}
