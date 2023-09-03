import patterns from '../../../patterns.ts';
import {
  QuizMode,
  type QuizResultsInfo,
  type QuizSettings,
  type ViolinString,
  type PatternId,
} from '../common.ts';
// TODO: refactor to multiple grids for different numbers of columns

type QuizResultsProps = {
  setMode: (mode: QuizMode) => void;
  results: QuizResultsInfo;
  quizSettings: QuizSettings;
};

export default function QuizResults({
  setMode,
  results,
  quizSettings,
}: QuizResultsProps) {
  const percentage = (results.correct / quizSettings.numOfQuestions) * 100;
  let colorClass = '';
  if (percentage >= 79.9) {
    colorClass = 'text-emerald-500';
  } else if (percentage >= 49.9) {
    colorClass = 'text-amber-500';
  } else {
    colorClass = 'text-rose-500';
  }

  function itemColorClass(mistakes: number) {
    if (mistakes > 2) {
      return 'text-rose-500';
    } else if (mistakes > 0) {
      return 'text-amber-500';
    } else {
      return 'text-emerald-500';
    }
  }

  // function resultsMessage() {
  //   if (percentage === 100.0) {
  //     return 'You got them all right! Keep it up!';
  //   }
  //   let message = '';
  //   if (percentage >= 80.0) {
  //     message += "Great Job! You're doing well.";
  //   } else if (percentage >= 50.0) {
  //     message += 'You did pretty well, but you can still improve.';
  //   } else {
  //     message += 'You might need to review your finger patterns a little more.';
  //   }
  // }

  return (
    <div class="mx-auto max-w-3xl flex flex-col gap-4">
      <h2 class="my-8 text-center text-4xl font-bold">Quiz Results</h2>
      <div className="grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-sm">
          <h3 className="text-center text-2xl font-bold">Percentage</h3>
          <div className={'-mr-4 text-center text-8xl font-bold ' + colorClass}>
            {percentage.toFixed(0)}%
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-6 shadow-sm sm:px-12">
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
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">E String</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.violinString.E)
            }
          >
            {results.missed.violinString.E}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">A String</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.violinString.A)
            }
          >
            {results.missed.violinString.A}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">D String</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.violinString.D)
            }
          >
            {results.missed.violinString.D}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-2xl font-bold">G String</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.violinString.G)
            }
          >
            {results.missed.violinString.G}
          </div>
        </div>
      </div>
      <div className="col-span-full -mb-2 text-2xl font-bold">
        Mistakes By Pattern
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">1-2 Pattern</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.patternId.oneTwo)
            }
          >
            {results.missed.patternId.oneTwo}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">2-3 Pattern</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.patternId.twoThree)
            }
          >
            {results.missed.patternId.twoThree}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">3-4 Pattern</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.patternId.threeFour)
            }
          >
            {results.missed.patternId.threeFour}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">Whole Steps</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.patternId.wholeSteps)
            }
          >
            {results.missed.patternId.wholeSteps}
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-sm">
          <h3 className="text-center text-lg font-bold">Half Steps</h3>
          <div
            className={
              'text-center text-4xl font-bold ' +
              itemColorClass(results.missed.patternId.halfSteps)
            }
          >
            {results.missed.patternId.halfSteps}
          </div>
        </div>
      </div>
    </div>
  );
}
