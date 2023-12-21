import { useRef, useState } from "preact/hooks";
import scales, { type Scale } from "../../../scales";
import type {
  SingleExerciseConfig,
  ViolinString,
  PatternId,
  PatternPosition,
} from "../common";
// import { cn } from "~/util";
// TODO: replace with tags

/*
enum FormMode {
  Manual = "MANUAL",
  ByKey = "BY_KEY",
}
*/

// TODO: redo as sentence type form with select elements instead of radio

export type ExerciseFormProps = {
  save: (exercise: SingleExerciseConfig) => void;
};
export default function ExerciseForm({ save }: ExerciseFormProps) {
  // const [formMode, setFormMode] = useState<FormMode>(FormMode.Manual);

  return (
    <div className="flex flex-col">
      <h2 className="mb-1 text-2xl font-bold">Add Exercises</h2>
      <p className="mb-4 text-sm">
        Configure an exercise below and click <strong>Add Exercise</strong> to
        add it to the list. Then click <strong>Start Practicing</strong>.
      </p>
      {/*
      <div className="col-span-2 flex items-center justify-center pb-2">
        <div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-x-4" aria-label="Tabs">
              <button
                onClick={() => setFormMode(FormMode.Manual)}
                className={cn(
                  formMode === FormMode.Manual
                    ? "border-fuchsia-500 text-fuchsia-600"
                    : "border-transparent text-black hover:border-fuchsia-300 hover:text-fuchsia-500",
                  "whitespace-nowrap border-b-2 px-1 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-white",
                )}
                aria-current={formMode === FormMode.Manual ? "page" : undefined}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setFormMode(FormMode.ByKey)}
                className={cn(
                  formMode === FormMode.ByKey
                    ? "border-fuchsia-500 text-fuchsia-600"
                    : "border-transparent text-black hover:border-fuchsia-300 hover:text-fuchsia-500",
                  "whitespace-nowrap border-b-2 px-1 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-white",
                )}
                aria-current={formMode === FormMode.ByKey ? "page" : undefined}
              >
                Choose A Key
              </button>
            </nav>
          </div>
        </div>
      </div>
      {formMode === FormMode.Manual && <ManualForm save={save} />}
      {formMode === FormMode.ByKey && <KeyForm save={save} />}
      */}
      <ManualForm save={save} />
    </div>
  );
}

function ManualForm({
  save,
}: {
  save: (exercise: SingleExerciseConfig) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  function handleSubmit(event: Event) {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }
    const data = new FormData(formRef.current);
    save({
      violinString: data.get("violin-string") as ViolinString,
      pattern: data.get("pattern") as PatternId,
      position: data.get("finger-position") as PatternPosition,
      numOfMeasures: parseInt(data.get("measures") as string),
      includeOpen: data.get("open-strings") === "with",
    });
  }

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      ref={formRef}
      class="flex flex-wrap items-center gap-2"
    >
      <fieldset
        className="inline-flex flex-wrap items-center gap-2"
        id="pattern-set"
      >
        <label htmlFor="pattern" className="sr-only">
          Select Pattern
        </label>
        <span>I will practice the</span>
        <select
          id="pattern"
          name="pattern"
          className="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          style={{
            appearance: "none",
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem top 50%",
            backgroundSize: "1rem auto",
            WebkitAppearance: "none",
            textIndent: 1,
            textOverflow: "",
          }}
        >
          <option value="oneTwo">1-2 Pattern</option>
          <option value="twoThree" selected>
            2-3 Pattern
          </option>
          <option value="threeFour">3-4 Pattern</option>
          <option value="halfSteps">Half Steps Pattern</option>
          <option value="wholeSteps">Whole Steps Pattern</option>
        </select>
      </fieldset>
      <fieldset className="inline-flex items-center gap-2" id="string-set">
        <label htmlFor="violin-string" className="sr-only">
          Select string
        </label>
        <span>on the</span>
        <select
          id="violin-string"
          name="violin-string"
          className="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          style={{
            appearance: "none",
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem top 50%",
            backgroundSize: "1rem auto",
            WebkitAppearance: "none",
            textIndent: 1,
            textOverflow: "",
          }}
        >
          <option value="E">E String</option>
          <option value="A" selected>
            A String
          </option>
          <option value="D">D String</option>
          <option value="G">G String</option>
        </select>
      </fieldset>
      <fieldset
        className="inline-flex items-center gap-2"
        id="finger-position-set"
      >
        <label htmlFor="finger-position" className="sr-only">
          Select Position
        </label>
        <span>with a</span>
        <select
          id="finger-position"
          name="finger-position"
          className="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          style={{
            appearance: "none",
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem top 50%",
            backgroundSize: "1rem auto",
            WebkitAppearance: "none",
            textIndent: 1,
            textOverflow: "",
          }}
        >
          <option value="low">Low</option>
          <option value="normal" selected>
            Normal
          </option>
          <option value="high">High</option>
        </select>
        <span>first finger</span>
      </fieldset>
      <fieldset className="inline-flex items-center gap-2" id="measures-set">
        <label htmlFor="measures" className="sr-only">
          Number of Measures
        </label>
        <span>for</span>
        <input
          type="number"
          name="measures"
          id="measures"
          pattern="[0-9]*"
          inputMode="numeric"
          className="relative block w-16 rounded-lg border border-fuchsia-700 bg-white px-2 py-1 font-sans shadow-sm focus:border-fuchsia-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          defaultValue="8"
          min={1}
          max={20}
        />
        <span>measures</span>
      </fieldset>
      <fieldset
        className="inline-flex items-center gap-2"
        id="open-strings-set"
      >
        <label htmlFor="open-strings" className="sr-only">
          Open Strings
        </label>
        <select
          id="open-strings"
          name="open-strings"
          className="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
          style={{
            appearance: "none",
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem top 50%",
            backgroundSize: "1rem auto",
            WebkitAppearance: "none",
            textIndent: 1,
            textOverflow: "",
          }}
        >
          <option value="with" selected>
            With
          </option>
          <option value="without">Without</option>
        </select>
        <span>open strings.</span>
      </fieldset>
      <div class="mt-4 flex w-full flex-row-reverse justify-start gap-x-2">
        <button
          type="submit"
          className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Add Exercise
        </button>
        <button
          type="reset"
          className="rounded-md bg-rose-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Reset to Default
        </button>
      </div>
    </form>
  );
}

/*
function KeyForm({ save }: { save: (exercise: SingleExerciseConfig) => void }) {
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [numOfMeasures, setNumOfMeasures] = useState<number>(8);
  const [includeOpen, setIncludeOpen] = useState<boolean>(true);

  function clear() {
    setSelectedScale(null);
    setNumOfMeasures(4);
    setIncludeOpen(true);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!selectedScale) return;
    const configs = [];
    for (const scalePattern of selectedScale.patterns) {
      configs.push({
        violinString: scalePattern.violinString,
        pattern: scalePattern.pattern.id,
        position: scalePattern.pattern.position,
        numOfMeasures,
        includeOpen,
      });
    }
    if (selectedScale.mode === "minor") {
      const melodicScale = scales.find(
        (s: Scale) => s.mode === "melodic" && s.key === selectedScale.key,
      );
      if (!melodicScale) return;

      // search for any patterns in the melodic scale that are not already in the configs set and add them
      for (const scalePattern of melodicScale.patterns) {
        if (
          !configs.find((c) => {
            return (
              c.pattern === scalePattern.pattern.id &&
              c.violinString === scalePattern.violinString &&
              c.position === scalePattern.pattern.position
            );
          })
        ) {
          configs.push({
            violinString: scalePattern.violinString,
            pattern: scalePattern.pattern.id,
            position: scalePattern.pattern.position,
            numOfMeasures,
            includeOpen,
          });
        }
      }
    }
    for (const config of configs) {
      save(config);
    }
  }

  return (
    <form
      class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4 lg:grid-cols-2"
      onSubmit={handleSubmit}
    >
      {scales.map(
        (scale: Scale) =>
          scale.mode === "major" && (
            <RadioBox
              value={scale.key}
              text={scale.name}
              key={scale.key + scale.mode}
              name="selectedScale"
              checked={
                selectedScale?.key === scale.key &&
                selectedScale?.mode === scale.mode
              }
              setChecked={() => setSelectedScale(scale)}
            />
          ),
      )}
      scales.map(
        (scale: Scale) =>
          scale.mode == "minor" && (
            <RadioBox
              value={scale.key}
              text={scale.name}
              key={scale.key + scale.mode}
              name="selectedScale"
              checked={
                selectedScale?.key === scale.key &&
                selectedScale?.mode === scale.mode
              }
              setChecked={() => setSelectedScale(scale)}
            />
          ),
      )
      <div class="col-span-full flex flex-col gap-4 sm:flex-row lg:flex-col">
        <div>
          <label
            htmlFor="numOfMeasures"
            className="text-xl font-bold leading-6 text-gray-900"
          >
            Number of Measures
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="numOfMeasures"
              id="numOfMeasures"
              className="relative block w-24 rounded-lg border border-pink-100 bg-white px-4 py-2 shadow-sm focus:border-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-700"
              value={numOfMeasures}
              onChange={(e: any) => setNumOfMeasures(parseInt(e.target.value))}
              min={1}
              max={20}
            />
          </div>
        </div>
        <fieldset>
          <legend className="text-xl font-bold leading-6 text-gray-900">
            Include Open Strings?
          </legend>
          <div class="mt-2 grid grid-cols-2 gap-x-4 text-center">
            <RadioBox
              value={"true"}
              text="Yes"
              key="openYes"
              name="openStrings"
              checked={includeOpen}
              setChecked={() => setIncludeOpen(true)}
            />
            <RadioBox
              value={"false"}
              text="No"
              key="openNo"
              name="openStrings"
              checked={!includeOpen}
              setChecked={() => setIncludeOpen(false)}
            />
          </div>
        </fieldset>
      </div>
      <div class="col-span-full mt-4 flex w-full flex-row-reverse justify-start space-x-2">
        <button
          type="submit"
          className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Add Exercises
        </button>
        <button
          type="reset"
          className="rounded-md bg-rose-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Reset to Default
        </button>
      </div>
    </form>
  );
}
*/
