import { useState } from "preact/hooks";
import { QuizMode, type QuizSettings, quizDefaults } from "../common.ts";
import ListCheckBox from "../components/ListCheckBox.tsx";

type QuizSetupProps = {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  setQuizSettings: (quizSettings: QuizSettings) => void;
};

export default function QuizSetup({
  setMode,
  quizSettings,
  setQuizSettings,
}: QuizSetupProps) {
  const [error, setError] = useState<string | null>(null);
  function validateQuizSettings() {
    if (quizSettings.numOfQuestions < 5) {
      return "Number of Questions must be at least 5";
    }
    if (quizSettings.strings.length === 0) {
      return "You must select at least one string";
    }
    if (quizSettings.patterns.length === 0) {
      return "You must select at least one pattern";
    }
    return null;
  }

  function submitQuizSettings() {
    const err = validateQuizSettings();
    if (err) {
      setError(err);
      return;
    }
    setMode(QuizMode.Taking);
  }

  // TODO: change number of questions to a number input or big buttons
  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        submitQuizSettings();
      }}
    >
      <h2 class="text-2xl mb-4">Quiz Setup</h2>
      <div class="flex space-x-4 items-center mb-4">
        <label
          htmlFor="numOfQuestions"
          className="text-lg font-bold leading-6 text-gray-900 mr-4"
        >
          Select Number of Questions
        </label>
        <select
          id="numOfQuestions"
          name="numOfQuestions"
          className="mt-2 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
          value={quizSettings.numOfQuestions}
          onChange={(e) =>
            setQuizSettings({
              ...quizSettings,
              numOfQuestions: parseInt(e.currentTarget.value),
            })
          }
        >
          <option>5</option>
          <option>10</option>
          <option>25</option>
        </select>
      </div>
      <fieldset class="mb-4">
        <legend class="text-lg font-bold leading-6 text-gray-900">
          Select Strings to Include
        </legend>
        <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-4 sm:gap-x-4">
          <ListCheckBox
            text="E String"
            isChecked={quizSettings.strings.includes("E")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                strings: isChecked
                  ? [...quizSettings.strings, "E"]
                  : quizSettings.strings.filter((s) => s !== "E"),
              })
            }
          />
          <ListCheckBox
            text="A String"
            isChecked={quizSettings.strings.includes("A")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                strings: isChecked
                  ? [...quizSettings.strings, "A"]
                  : quizSettings.strings.filter((s) => s !== "A"),
              })
            }
          />
          <ListCheckBox
            text="D String"
            isChecked={quizSettings.strings.includes("D")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                strings: isChecked
                  ? [...quizSettings.strings, "D"]
                  : quizSettings.strings.filter((s) => s !== "D"),
              })
            }
          />
          <ListCheckBox
            text="G String"
            isChecked={quizSettings.strings.includes("G")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                strings: isChecked
                  ? [...quizSettings.strings, "G"]
                  : quizSettings.strings.filter((s) => s !== "G"),
              })
            }
          />
        </div>
      </fieldset>
      <fieldset class="mb-4">
        <legend class="text-lg font-bold leading-6 text-gray-900">
          Select Patterns to Include
        </legend>
        <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-5 sm:gap-x-4">
          <ListCheckBox
            text="1-2 Pattern"
            isChecked={quizSettings.patterns.includes("12")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                patterns: isChecked
                  ? [...quizSettings.patterns, "12"]
                  : quizSettings.patterns.filter((s) => s !== "12"),
              })
            }
          />
          <ListCheckBox
            text="2-3 Pattern"
            isChecked={quizSettings.patterns.includes("23")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                patterns: isChecked
                  ? [...quizSettings.patterns, "23"]
                  : quizSettings.patterns.filter((s) => s !== "23"),
              })
            }
          />
          <ListCheckBox
            text="3-4 Pattern"
            isChecked={quizSettings.patterns.includes("34")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                patterns: isChecked
                  ? [...quizSettings.patterns, "34"]
                  : quizSettings.patterns.filter((s) => s !== "34"),
              })
            }
          />
          <ListCheckBox
            text="Whole Steps Pattern"
            isChecked={quizSettings.patterns.includes("W")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                patterns: isChecked
                  ? [...quizSettings.patterns, "W"]
                  : quizSettings.patterns.filter((s) => s !== "W"),
              })
            }
          />
          <ListCheckBox
            text="Half Steps Pattern"
            isChecked={quizSettings.patterns.includes("H")}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                patterns: isChecked
                  ? [...quizSettings.patterns, "H"]
                  : quizSettings.patterns.filter((s) => s !== "H"),
              })
            }
          />
        </div>
      </fieldset>
      <fieldset class="mb-4">
        <legend class="text-lg font-bold leading-6 text-gray-900">
          Choose whether notes should be in ascending order or random (more
          difficult).
        </legend>
        <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
          <ListCheckBox
            text="Notes in Ascending Order"
            isChecked={quizSettings.inOrder}
            setIsChecked={(isChecked: boolean) =>
              setQuizSettings({
                ...quizSettings,
                inOrder: isChecked,
              })
            }
          />
          <ListCheckBox
            text="Notes in Random Order"
            isChecked={!quizSettings.inOrder}
            setIsChecked={(isChecked) =>
              setQuizSettings({ ...quizSettings, inOrder: !isChecked })
            }
          />
        </div>
      </fieldset>
      {error && <p class="text-rose-700 text-sm italic">{error}</p>}
      <div class="flex space-x-2 justify-end w-full">
        <button
          type="button"
          onClick={() => setQuizSettings(quizDefaults)}
          className="tracking-wide rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Reset to Default
        </button>
        <button
          type="submit"
          className="tracking-wide rounded-md bg-fuchsia-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Take Quiz
        </button>
      </div>
    </form>
  );
}
