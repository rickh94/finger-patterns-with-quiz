import { useState, useEffect } from "preact/hooks";
import NotesDisplay from "../../NotesDisplay";
import FingerDisplay from "../../FingerDisplay";
import type { SingleExerciseConfig } from "../common";
import patterns from "../../../patterns";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

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
      <div class="mt-4 flex w-full items-center justify-between gap-x-2">
        {hasPrevExercise() ? (
          <button
            type="button"
            onClick={() => prevExercise()}
            className="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
          >
            <ChevronLeftIcon class="-ml-1 size-5" />
            Previous
          </button>
        ) : (
          <button
            type="button"
            disabled={true}
            className="btn bg-gray-600 text-white"
          >
            <ChevronLeftIcon className="-ml-1 size-5" />
            Previous
          </button>
        )}
        <div class="flex justify-center">
          <button
            type="button"
            onClick={() => reconfigure()}
            className="btn bg-amber-600 text-white hover:bg-amber-500"
          >
            <CogIcon className="-ml-1 size-5" />
            Setup
          </button>
        </div>
        {hasNextExercise() ? (
          <button
            type="button"
            onClick={() => nextExercise()}
            className="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
          >
            Next
            <ChevronRightIcon className="-mr-1 size-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => finish()}
            className="btn bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Finish
            <CheckIcon className="-mr-1 size-5" />
          </button>
        )}
      </div>
    </>
  );
}
