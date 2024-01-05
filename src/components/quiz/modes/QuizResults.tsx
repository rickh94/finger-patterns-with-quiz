import { useState, useEffect } from "preact/hooks";
import {
  QuizMode,
  type QuizResultsInfo,
  type QuizSettings,
  type QuestionInfo,
} from "../common";
import generateQuiz from "../generateQuiz";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CogIcon } from "@heroicons/react/24/solid";
// TODO: make the loading feedback a little prettier, maybe its own component

type QuizResultsProps = {
  setMode: (mode: QuizMode) => void;
  results: QuizResultsInfo;
  quizSettings: QuizSettings;
  setQuizQuestions: (quizQuestions: QuestionInfo[]) => void;
  clearResults: () => void;
};

export default function QuizResults({
  setMode,
  results,
  quizSettings,
  setQuizQuestions,
  clearResults,
}: QuizResultsProps) {
  const [percentage, setPercentage] = useState(0);
  const [colorClass, setColorClass] = useState("");
  const [message, setMessage] = useState("Loading Feedback...");

  useEffect(() => {
    const nextPercentage =
      (results.correct / quizSettings.numOfQuestions) * 100;
    setPercentage(nextPercentage);
    if (nextPercentage >= 79.9) {
      setColorClass("text-emerald-500");
    } else if (percentage >= 49.9) {
      setColorClass("text-amber-500");
    } else {
      setColorClass("text-rose-500");
    }
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.text();
        }
      })
      .then((text?: string) => {
        if (text) {
          setMessage(text);
        } else {
          setMessage("Something went wrong.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Something went wrong.");
      });
  }, [results, quizSettings, setPercentage, setMessage, setColorClass]);

  function itemColorClass(mistakes: number) {
    if (mistakes > 2) {
      return "text-rose-500";
    } else if (mistakes > 0) {
      return "text-amber-500";
    } else {
      return "text-emerald-500";
    }
  }

  function newQuiz() {
    const questions = generateQuiz(quizSettings);
    setQuizQuestions(questions);
    setMode(QuizMode.Taking);
    clearResults();
  }

  // TODO: call api endpoint to get ai generated text and display on the page.
  // display loading text until it's available. Needs to be in a useEffect.

  return (
    <div class="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="my-6 text-center text-4xl font-bold">Quiz Results</h2>
        </div>
        <div class="flex gap-x-2">
          <button
            type="button"
            class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
            onClick={() => newQuiz()}
          >
            <ArrowPathIcon className="-ml-1 size-5" />
            New Quiz
          </button>
          <button
            type="button"
            class="btn bg-amber-600 text-white hover:bg-amber-500"
            onClick={() => setMode(QuizMode.Setup)}
          >
            <CogIcon className="-ml-1 size-5" />
            Change Quiz Settings
          </button>
        </div>
      </div>
      <p class="wrap-balance mb-2 text-lg">{message}</p>
      <div className="grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-pink-100 bg-white px-4 py-6 shadow-sm">
          <h3 className="text-center text-2xl font-bold">Percentage</h3>
          <div className={`-mr-4 text-center text-8xl font-bold ${colorClass}`}>
            {percentage.toFixed(0)}%
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-4 py-6 shadow-sm sm:px-12">
          <h3 className="text-left text-2xl font-bold">Breakdown</h3>
          <table>
            <tbody>
              <tr>
                <td className="text-left text-4xl font-bold text-emerald-500">
                  {results.correct}
                </td>
                <td class="text-2xl">Correct</td>
              </tr>
              <tr>
                <td className="text-left text-4xl font-bold text-rose-500">
                  {results.incorrect}
                </td>
                <td class="text-2xl">Incorrect</td>
              </tr>
              <tr>
                <td className="text-left text-4xl font-bold">
                  {quizSettings.numOfQuestions}
                </td>
                <td class="text-2xl">Total</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="-mb-2 text-2xl font-bold">Mistakes By String</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">E String</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.violinString.E,
            )}`}
          >
            {results.missed.violinString.E}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">A String</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.violinString.A,
            )}`}
          >
            {results.missed.violinString.A}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">D String</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.violinString.D,
            )}`}
          >
            {results.missed.violinString.D}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">G String</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.violinString.G,
            )}`}
          >
            {results.missed.violinString.G}
          </div>
        </div>
      </div>
      <div className="col-span-full -mb-2 text-2xl font-bold">
        Mistakes By Pattern
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">1-2 Pattern</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.patternId.oneTwo,
            )}`}
          >
            {results.missed.patternId.oneTwo}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">2-3 Pattern</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.patternId.twoThree,
            )}`}
          >
            {results.missed.patternId.twoThree}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">3-4 Pattern</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.patternId.threeFour,
            )}`}
          >
            {results.missed.patternId.threeFour}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">Whole Steps</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.patternId.wholeSteps,
            )}`}
          >
            {results.missed.patternId.wholeSteps}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">Half Steps</h3>
          <div
            className={`text-center text-4xl font-bold ${itemColorClass(
              results.missed.patternId.halfSteps,
            )}`}
          >
            {results.missed.patternId.halfSteps}
          </div>
        </div>
      </div>
    </div>
  );
}
