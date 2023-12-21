import { useState, useEffect } from "preact/hooks";
import NotesDisplay from "../../NotesDisplay";
import FingerDisplay from "../../FingerDisplay";
import type { SingleExerciseConfig } from "../common";
import patterns from "../../../patterns";

// TODO: display sevcik rhythm patterns

export type PracticeDisplayProps = {
  exerciseConfigs: SingleExerciseConfig[];
  exercises: string[];
  finish: () => void;
  reconfigure: () => void;
  currentExerciseIdx: number;
  hasNextExercise: () => boolean;
  nextExercise: () => void;
  prevExercise: () => void;
  hasPrevExercise: () => boolean;
};

function genRandomId() {
  return Math.random();
}

export default function PracticeDisplay({
  exerciseConfigs,
  exercises,
  finish,
  reconfigure,
  currentExerciseIdx,
  nextExercise,
  prevExercise,
  hasNextExercise,
  hasPrevExercise,
}: PracticeDisplayProps) {
  const [exercise, setExercise] = useState<string | undefined>(undefined);
  const [exerciseConfig, setExerciseConfig] = useState<
    SingleExerciseConfig | undefined
  >(undefined);

  useEffect(() => {
    setExercise(exercises[currentExerciseIdx]);
    setExerciseConfig(exerciseConfigs[currentExerciseIdx]);
  }, [currentExerciseIdx, exercises, exerciseConfigs]);
  if (!exerciseConfig || !exercise) {
    return null;
  }

  return (
    <>
      <h2 className="text-lg leading-6 text-gray-900">
        Practicing the{" "}
        <strong class="font-sans font-bold text-fuchsia-700">
          {patterns.normal[exerciseConfig.pattern]?.name}
        </strong>{" "}
        on the{" "}
        <strong class="font-sans font-bold text-fuchsia-700">
          {exerciseConfig.violinString} String
        </strong>{" "}
        in the{" "}
        <strong class="font-sans font-bold text-fuchsia-700">
          {exerciseConfig.position} position
        </strong>{" "}
        for {exerciseConfig.numOfMeasures} measures
      </h2>
      <div className="flex w-full items-center justify-center">
        <FingerDisplay
          baseId={`exercise-${exerciseConfig.id}`}
          radius={2}
          widths={
            patterns[exerciseConfig.position][exerciseConfig.pattern]
              ?.widths ?? [4, 4, 4, 4]
          }
          disabled={true}
        />
      </div>
      <NotesDisplay
        baseId={`exercise-${
          exerciseConfigs[currentExerciseIdx]?.id ?? genRandomId()
        }`}
        notes={exercises[currentExerciseIdx] ?? ""}
        offset={0}
        disabled={true}
        wrap={{
          minSpacing: 1.4,
          maxSpacing: 2.7,
          preferredMeasuresPerLine: 4,
        }}
        responsive="resize"
        staffwidth={720}
      />
      <div class="mt-4 flex w-full justify-between gap-x-2">
        {hasPrevExercise() ? (
          <button
            type="button"
            onClick={() => prevExercise()}
            className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
          >
            Previous
          </button>
        ) : (
          <button
            type="button"
            disabled={true}
            className="rounded-md bg-gray-600 px-3 py-2 font-bold tracking-wide text-white"
          >
            Previous
          </button>
        )}
        <div class="flex justify-center">
          <button
            type="button"
            onClick={() => reconfigure()}
            className="rounded-md bg-amber-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Setup
          </button>
        </div>
        {hasNextExercise() ? (
          <button
            type="button"
            onClick={() => nextExercise()}
            className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={() => finish()}
            className="rounded-md bg-emerald-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Finish
          </button>
        )}
      </div>
    </>
  );
}
