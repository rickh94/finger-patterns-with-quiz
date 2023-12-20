import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { type SingleExerciseConfig } from "../common";
import ExerciseForm from "../components/ExerciseForm";
import patterns from "../../../patterns";
import {
  createShareLink,
  decodeShareLink,
  generateExerciseConfigsFromQuery,
} from "../generateExercises";
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
  const [link, setLink] = useState("");
  const shareLinkRef = useRef<HTMLInputElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  function addExerciseConfig(exercise: SingleExerciseConfig) {
    exercise.id = Math.floor(Math.random() * 1000000);
    setExerciseConfigs((configs: SingleExerciseConfig[]) =>
      configs.concat([exercise]),
    );
    setLink("");
  }

  function deleteExerciseConfig(deleteId: number | undefined) {
    if (deleteId === undefined) {
      return;
    }
    setExerciseConfigs((configs: SingleExerciseConfig[]) =>
      configs.filter((ex: SingleExerciseConfig) => ex.id !== deleteId),
    );
    setLink("");
  }

  const share = useCallback(
    function () {
      setLink(createShareLink(exerciseConfigs));
    },
    [exerciseConfigs],
  );

  const copyLink = useCallback(
    async function () {
      if (link) {
        await navigator.clipboard.writeText(link);
        if (copyButtonRef.current) {
          copyButtonRef.current.innerText = "Copied!";
          setTimeout(() => {
            if (copyButtonRef.current) {
              copyButtonRef.current.innerText = "Copy Link";
            }
          }, 1000);
        }
      }
    },
    [copyButtonRef.current, link],
  );

  useEffect(() => {
    if (exerciseConfigs.length === 0) {
      const shareConfigs = decodeShareLink();
      const idConfigs = generateExerciseConfigsFromQuery();
      if (shareConfigs && shareConfigs.length > 0) {
        for (const config of shareConfigs) {
          addExerciseConfig(config);
        }
      } else if (idConfigs) {
        for (const config of idConfigs) {
          addExerciseConfig(config);
        }
      }
    }
  }, [exerciseConfigs]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [parent] = useAutoAnimate();

  return (
    <>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ExerciseForm save={addExerciseConfig} />
        <div class="min-h-[32rem] md:col-span-2">
          <h2 className="text-2xl font-bold">Exercises</h2>
          {/*
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
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
                onClick={share}
                className="rounded-md bg-sky-500 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Share
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
        {link && (
          <div className="mt-4 flex w-full items-center justify-center gap-x-2">
            <label htmlFor="share-link-input" className="flex-grow-0">
              Shareable Link:
            </label>
            <input
              ref={shareLinkRef}
              readOnly={true}
              type="text"
              value={link}
              className="flex-grow rounded border border-gray-300 bg-white p-2"
            />
            <button
              type="button"
              onClick={copyLink}
              className="w-[8rem] rounded-md bg-sky-500 px-3 py-2 font-bold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              ref={copyButtonRef}
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </>
  );
}
