import { useState } from "preact/hooks";
import scales, { type Scale } from "../../../scales";
import type {
  SingleExerciseConfig,
  ViolinString,
  PatternId,
  PatternPosition,
} from "../common";
import RadioBox from "../../quiz/components/RadioBox";
// import { cn } from "~/util";
// TODO: replace with tags

/*
enum FormMode {
  Manual = "MANUAL",
  ByKey = "BY_KEY",
}
*/

export type ExerciseFormProps = {
  save: (exercise: SingleExerciseConfig) => void;
};
export default function ExerciseForm({ save }: ExerciseFormProps) {
  // const [formMode, setFormMode] = useState<FormMode>(FormMode.Manual);

  return (
    <div className="flex flex-col px-4">
      <h2 className="mb-1 text-2xl font-bold">Add Exercises</h2>
      <p className="mb-4 text-sm">
        Using the options below, set up an exercise and add it to the list.
        Create as many as you want.
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
  const [violinString, setViolinString] = useState<ViolinString>("A");
  const [pattern, setPattern] = useState<PatternId>("oneTwo");
  const [position, setPosition] = useState<PatternPosition>("normal");
  const [numOfMeasures, setNumOfMeasures] = useState<number>(8);
  const [includeOpen, setIncludeOpen] = useState<boolean>(true);

  function clear() {
    setViolinString("A");
    setPattern("oneTwo");
    setPosition("normal");
    setNumOfMeasures(4);
    setIncludeOpen(true);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    save({
      violinString,
      pattern,
      position,
      numOfMeasures,
      includeOpen,
    });
  }

  return (
    <form action="#" onSubmit={handleSubmit} class="col-span-1">
      <div class="mb-4 flex flex-col gap-4">
        <fieldset>
          <legend className="text-xl font-bold leading-6 text-gray-900">
            String
          </legend>
          <div class="mt-2 grid grid-cols-2 gap-2 text-center">
            <RadioBox
              value={"E"}
              text="E String"
              key="violinStringE"
              name="violinString"
              checked={violinString === "E"}
              setChecked={() => setViolinString("E")}
            />
            <RadioBox
              value={"A"}
              text="A String"
              key="violinStringA"
              name="violinString"
              checked={violinString === "A"}
              setChecked={() => setViolinString("A")}
            />
            <RadioBox
              value={"D"}
              text="D String"
              key="violinStringD"
              name="violinString"
              checked={violinString === "D"}
              setChecked={() => setViolinString("D")}
            />
            <RadioBox
              value={"G"}
              text="G String"
              key="violinStringG"
              name="violinString"
              checked={violinString === "G"}
              setChecked={() => setViolinString("G")}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xl font-bold leading-6 text-gray-900">
            Finger Pattern
          </legend>
          <div class="mt-2 grid grid-cols-2 gap-2 text-center">
            <RadioBox
              value={"oneTwo"}
              text="1-2 Pattern"
              key="patternOneTwo"
              name="pattern"
              checked={pattern === "oneTwo"}
              setChecked={() => setPattern("oneTwo")}
            />
            <RadioBox
              value={"twoThree"}
              text="2-3 Pattern"
              key="patternTwoThree"
              name="pattern"
              checked={pattern === "twoThree"}
              setChecked={() => setPattern("twoThree")}
            />
            <RadioBox
              value={"threeFour"}
              text="3-4 Pattern"
              key="patternThreeFour"
              name="pattern"
              checked={pattern === "threeFour"}
              setChecked={() => setPattern("threeFour")}
            />
            <RadioBox
              value={"halfSteps"}
              text="Half Steps"
              key="patternHalfSteps"
              name="pattern"
              checked={pattern === "halfSteps"}
              setChecked={() => setPattern("halfSteps")}
            />
            <RadioBox
              value={"wholeSteps"}
              text="Whole Steps"
              key="patternWholeSteps"
              name="pattern"
              checked={pattern === "wholeSteps"}
              setChecked={() => setPattern("wholeSteps")}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xl font-bold leading-6 text-gray-900">
            Finger Pattern Position
          </legend>
          <div class="mt-2 grid grid-cols-2 gap-2 text-center">
            <RadioBox
              value={"low"}
              text="Low One"
              key="positionLow"
              name="position"
              checked={position === "low"}
              setChecked={() => setPosition("low")}
            />
            <RadioBox
              value={"normal"}
              text="Normal"
              key="positionNormal"
              name="position"
              checked={position === "normal"}
              setChecked={() => setPosition("normal")}
            />
            <RadioBox
              value={"high"}
              text="High One"
              key="positionHigh"
              name="position"
              checked={position === "high"}
              setChecked={() => setPosition("high")}
            />
          </div>
        </fieldset>
        <div class="flex flex-col gap-4 sm:flex-row lg:flex-col">
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
                onChange={(e: any) =>
                  setNumOfMeasures(parseInt(e.target.value))
                }
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
      </div>
      <div class="mt-4 flex w-full justify-end space-x-2">
        <button
          type="button"
          onClick={() => clear()}
          className="rounded-md bg-rose-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Reset to Default
        </button>
        <button
          type="submit"
          className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Add Exercise
        </button>
      </div>
    </form>
  );
}

function KeyForm({ save }: { save: (exercise: SingleExerciseConfig) => void }) {
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [numOfMeasures, setNumOfMeasures] = useState<number>(8);
  const [includeOpen, setIncludeOpen] = useState<boolean>(true);

  function clear() {
    setSelectedScale(null);
    setNumOfMeasures(4);
    setIncludeOpen(true);
  }

  function handleSubmit(e: any) {
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
      {/*scales.map(
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
      )*/}
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
      <div class="col-span-full mt-4 flex w-full justify-end space-x-2">
        <button
          type="button"
          onClick={() => clear()}
          className="rounded-md bg-rose-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Reset to Default
        </button>
        <button
          type="submit"
          className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Add Exercises
        </button>
      </div>
    </form>
  );
}
