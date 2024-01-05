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
import {
  DocumentDuplicateIcon,
  PlayCircleIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

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
  const copyButtonContentRef = useRef<HTMLSpanElement>(null);

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
        if (copyButtonContentRef.current) {
          copyButtonContentRef.current.innerText = "Copied!";
          setTimeout(() => {
            if (copyButtonContentRef.current) {
              copyButtonContentRef.current.innerText = "Copy Link";
            }
          }, 1000);
        }
      }
    },
    [copyButtonContentRef.current, link],
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
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <>
      <div class="flex flex-col gap-4 sm:mx-auto sm:max-w-4xl">
        <ExerciseForm save={addExerciseConfig} />
        <div class="min-h-[32rem] pb-12 md:col-span-2">
          <h2 className="text-2xl font-bold">Exercises</h2>
          {/*
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <ul className="my-2 flex flex-col gap-2" ref={parent}>
            {exerciseConfigs.length === 0 && (
              <p>Use the form to create some exercises</p>
            )}
            {exerciseConfigs.map(
              (exercise) =>
                exercise?.id !== undefined && (
                  <li
                    key={exercise.id}
                    className="flex items-center justify-between gap-x-6 rounded bg-white px-4 py-2 shadow"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="wrap-balance leading-6 text-gray-900">
                          I will practice the{" "}
                          <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
                            {patterns.normal[exercise.pattern]?.name}
                          </strong>{" "}
                          on the{" "}
                          <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
                            {exercise.violinString} String
                          </strong>{" "}
                          with a{" "}
                          <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
                            {exercise.position} first finger
                          </strong>{" "}
                          for{" "}
                          <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
                            {exercise.numOfMeasures} measures
                          </strong>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteExerciseConfig(exercise.id)}
                      className="btn-sm bg-rose-600  text-white hover:bg-rose-500"
                    >
                      Delete
                      <TrashIcon className="-mr-1 size-4" />
                    </button>
                  </li>
                ),
            )}
          </ul>
          {exerciseConfigs.length !== 0 && (
            <div class="mt-4 flex w-full flex-row-reverse flex-wrap justify-start gap-2">
              <button
                type="button"
                onClick={startPracticing}
                className="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
              >
                <PlayCircleIcon className="-ml-1 size-5" />
                Start Practicing
              </button>
              <button
                type="button"
                onClick={share}
                className="btn bg-sky-500 text-white hover:bg-sky-400"
              >
                <ShareIcon className="-ml-1 size-5" />
                Share
              </button>
              <button
                type="button"
                onClick={clear}
                className="btn btn bg-rose-600 text-white hover:bg-rose-500"
              >
                <TrashIcon className="-ml-1 size-5" />
                Delete All Exercises
              </button>
            </div>
          )}
          {link && (
            <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-2">
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
                className="btn w-[9rem] bg-sky-500 text-white"
              >
                <span ref={copyButtonContentRef}>Copy Link</span>
                <DocumentDuplicateIcon className="-mr-1 size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
