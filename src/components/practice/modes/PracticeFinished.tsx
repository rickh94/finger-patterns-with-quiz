import type { SingleExerciseConfig } from '../common';
import patterns from '../../../patterns';

type PracticeFinishedProps = {
  restart: () => void;
  regenerate: () => void;
  reconfigure: () => void;
  exerciseConfigs: SingleExerciseConfig[];
};
export default function PracticeFinished({
  restart,
  regenerate,
  reconfigure,
  exerciseConfigs,
}: PracticeFinishedProps) {
  return (
    <div class="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 class="my-4 text-center text-4xl font-bold">Great Job!</h2>
      <p class="mb-2 text-lg">
        Great Job Practicing your finger patterns. Select one of the options
        below to practice the same exercises again, create new exercises for the
        same set of patterns, or choose new patterns to practice.
      </p>
      <div class="flex w-full flex-col gap-2  sm:flex-row">
        <button
          type="button"
          onClick={restart}
          className="rounded-md bg-emerald-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Same Exercises
        </button>
        <button
          type="button"
          onClick={regenerate}
          className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Same Patterns
        </button>
        <button
          onClick={reconfigure}
          className="rounded-md bg-amber-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Pick New Patterns
        </button>
      </div>
      <h3 class="text-xl font-bold">Patterns Practiced</h3>
      {exerciseConfigs.map(
        (exercise) =>
          exercise?.id !== undefined && (
            <li
              key={exercise.id}
              className="flex items-center justify-between gap-x-6 rounded bg-white px-4 py-2 shadow"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="wrap-balance italic leading-6 text-gray-900">
                    <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                      {patterns.normal[exercise.pattern].name}
                    </strong>{' '}
                    on the{' '}
                    <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                      {exercise.violinString} String
                    </strong>{' '}
                    in the{' '}
                    <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                      {exercise.position} position
                    </strong>
                  </p>
                </div>
              </div>
            </li>
          )
      )}
    </div>
  );
}
