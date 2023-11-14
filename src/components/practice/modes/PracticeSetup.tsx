import { useEffect } from "preact/hooks";
import { type SingleExerciseConfig } from "../common";
import ExerciseForm from "../components/ExerciseForm";
import patterns from "../../../patterns";
import { generateExerciseConfigsFromQuery } from "../generateExercises";
import { useAutoAnimate } from "@formkit/auto-animate/preact";

// TODO: add exercise added pop up with jump link arrow
// TODO: add transition between tabs

type PracticeSetupProps = {
  startPracticing: () => void;
  exerciseConfigs: SingleExerciseConfig[];
  setExerciseConfigs: (
    f: (exerciseConfigs: SingleExerciseConfig[]) => SingleExerciseConfig[],
  ) => void;
  clear: () => void;
};

export default function PracticeSetup({
  startPracticing,
  exerciseConfigs,
  setExerciseConfigs,
  clear,
}: PracticeSetupProps) {
  function addExerciseConfig(exercise: SingleExerciseConfig) {
    exercise.id = Math.floor(Math.random() * 1000000);
    setExerciseConfigs((configs: SingleExerciseConfig[]) =>
      configs.concat([exercise]),
    );
  }

  function deleteExerciseConfig(deleteId: number | undefined) {
    if (deleteId === undefined) {
      return;
    }
    setExerciseConfigs((configs: SingleExerciseConfig[]) =>
      configs.filter((ex: SingleExerciseConfig) => ex.id !== deleteId),
    );
  }

  useEffect(() => {
    if (exerciseConfigs.length === 0) {
      const configs = generateExerciseConfigsFromQuery();
      for (const config of configs) {
        addExerciseConfig(config);
      }
    }
  }, []);
  const [parent] = useAutoAnimate();

  useEffect(() => {}, [exerciseConfigs]);

  return (
    <>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ExerciseForm save={addExerciseConfig} />
        <div class="md:col-span-2">
          <h2 className="text-2xl font-bold">Exercises</h2>
          <ul className="my-2 flex flex-col gap-2" ref={parent}>
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
                          Practice the{" "}
                          <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                            {patterns.normal[exercise.pattern]?.name}
                          </strong>{" "}
                          on the{" "}
                          <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                            {exercise.violinString} String
                          </strong>{" "}
                          in the{" "}
                          <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                            {exercise.position} position
                          </strong>{" "}
                          for{" "}
                          <strong class="wrap-nowrap font-bold not-italic text-fuchsia-700">
                            {exercise.numOfMeasures} measures
                          </strong>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteExerciseConfig(exercise.id)}
                      className="rounded-md bg-rose-600 px-2.5 py-1.5 text-sm font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                    >
                      Delete
                    </button>
                  </li>
                ),
            )}
          </ul>
          {exerciseConfigs.length !== 0 && (
            <div class="mt-4 flex w-full justify-end space-x-2">
              <button
                type="button"
                onClick={clear}
                className="rounded-md bg-rose-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                Delete All Exercises
              </button>
              <button
                type="button"
                onClick={startPracticing}
                className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
              >
                Start Practicing
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
