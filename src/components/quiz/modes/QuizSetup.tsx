import { useState } from "preact/hooks";
import {
  QuizMode,
  type QuizSettings,
  type QuestionInfo,
  quizDefaults,
} from "../common.ts";
import generateQuiz from "../generateQuiz.ts";
import ListCheckBox from "../components/ListCheckBox.tsx";
import RadioBox from "../components/RadioBox.tsx";

// TODO: fix num of questions load
type QuizSetupProps = {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  setQuizSettings: (quizSettings: QuizSettings) => void;
  setQuizQuestions: (quizQuestions: QuestionInfo[]) => void;
  clearResults: () => void;
};

export default function QuizSetup({
  setMode,
  quizSettings,
  setQuizSettings,
  setQuizQuestions,
  clearResults,
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
    setError(null);
    const questions = generateQuiz(quizSettings);
    setQuizQuestions(questions);
    clearResults();
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
      <h2 class="mb-4 text-2xl">Quiz Setup</h2>
      <p class="mb-4 italic">Click the options below to configure your quiz.</p>
      <div class="mb-4 flex flex-col gap-6">
        <fieldset>
          <legend className="text-xl font-bold leading-6 text-gray-900">
            Number of Questions
          </legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 text-center sm:grid-cols-6 sm:gap-x-4">
            <RadioBox
              value={5}
              text="5"
              key="numOfQuestions5"
              name="numOfQuestions"
              checked={quizSettings.numOfQuestions === 5}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, numOfQuestions: 5 })
              }
            />
            <RadioBox
              value={10}
              text="10"
              key="numOfQuestions10"
              name="numOfQuestions"
              checked={quizSettings.numOfQuestions === 10}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, numOfQuestions: 10 })
              }
            />
            <RadioBox
              value={15}
              text="15"
              key="numOfQuestions15"
              name="numOfQuestions"
              checked={quizSettings.numOfQuestions === 15}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, numOfQuestions: 15 })
              }
            />
            <RadioBox
              value={20}
              text="20"
              key="numOfQuestions20"
              name="numOfQuestions"
              checked={quizSettings.numOfQuestions === 20}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, numOfQuestions: 20 })
              }
            />
            <RadioBox
              value={25}
              text="25"
              key="numOfQuestions25"
              name="numOfQuestions"
              checked={quizSettings.numOfQuestions === 25}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, numOfQuestions: 25 })
              }
            />
            <RadioBox
              value={30}
              text="30"
              key="numOfQuestions30"
              name="numOfQuestions"
              checked={quizSettings.numOfQuestions === 30}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, numOfQuestions: 30 })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">
            Select Strings to Include
          </legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-4 sm:gap-x-4">
            <ListCheckBox
              text="E String"
              key="e-string"
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
              key="a-string"
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
              key="d-string"
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
              key="g-string"
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
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">
            Select Patterns to Include
          </legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-5 sm:gap-x-4">
            <ListCheckBox
              text="1-2 Pattern"
              key="one-two-pattern"
              isChecked={quizSettings.patterns.includes("oneTwo")}
              setIsChecked={(isChecked: boolean) =>
                setQuizSettings({
                  ...quizSettings,
                  patterns: isChecked
                    ? [...quizSettings.patterns, "oneTwo"]
                    : quizSettings.patterns.filter((s) => s !== "oneTwo"),
                })
              }
            />
            <ListCheckBox
              text="2-3 Pattern"
              key="two-three-pattern"
              isChecked={quizSettings.patterns.includes("twoThree")}
              setIsChecked={(isChecked: boolean) =>
                setQuizSettings({
                  ...quizSettings,
                  patterns: isChecked
                    ? [...quizSettings.patterns, "twoThree"]
                    : quizSettings.patterns.filter((s) => s !== "twoThree"),
                })
              }
            />
            <ListCheckBox
              text="3-4 Pattern"
              key="three-four-pattern"
              isChecked={quizSettings.patterns.includes("threeFour")}
              setIsChecked={(isChecked: boolean) =>
                setQuizSettings({
                  ...quizSettings,
                  patterns: isChecked
                    ? [...quizSettings.patterns, "threeFour"]
                    : quizSettings.patterns.filter((s) => s !== "threeFour"),
                })
              }
            />
            <ListCheckBox
              text="Whole Steps Pattern"
              key="whole-steps-pattern"
              isChecked={quizSettings.patterns.includes("wholeSteps")}
              setIsChecked={(isChecked: boolean) =>
                setQuizSettings({
                  ...quizSettings,
                  patterns: isChecked
                    ? [...quizSettings.patterns, "wholeSteps"]
                    : quizSettings.patterns.filter((s) => s !== "wholeSteps"),
                })
              }
            />
            <ListCheckBox
              text="Half Steps Pattern"
              key="half-steps-pattern"
              isChecked={quizSettings.patterns.includes("halfSteps")}
              setIsChecked={(isChecked: boolean) =>
                setQuizSettings({
                  ...quizSettings,
                  patterns: isChecked
                    ? [...quizSettings.patterns, "halfSteps"]
                    : quizSettings.patterns.filter((s) => s !== "halfSteps"),
                })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">
            Choose whether notes should be in ascending order or random (more
            difficult).
          </legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
            <ListCheckBox
              text="Notes in Ascending Order"
              key="ascending-order"
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
              key="random-order"
              isChecked={!quizSettings.inOrder}
              setIsChecked={(isChecked) =>
                setQuizSettings({ ...quizSettings, inOrder: !isChecked })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-xl font-bold leading-6 text-gray-900">
            Difficulty
          </legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-5 sm:gap-x-4">
            <RadioBox
              value={1}
              text="Trivial"
              key="difficulty1"
              name="difficulty"
              checked={quizSettings.difficulty === 1}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, difficulty: 1 })
              }
            />
            <RadioBox
              value={2}
              text="Easy"
              key="difficulty2"
              name="difficulty"
              checked={quizSettings.difficulty === 2}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, difficulty: 2 })
              }
            />
            <RadioBox
              value={3}
              text="Normal"
              key="difficulty3"
              name="difficulty"
              checked={quizSettings.difficulty === 3}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, difficulty: 3 })
              }
            />
            <RadioBox
              value={4}
              text="Difficult"
              key="difficulty4"
              name="difficulty"
              checked={quizSettings.difficulty === 4}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, difficulty: 4 })
              }
            />
            <RadioBox
              value={5}
              text="Impossible"
              key="difficulty5"
              name="difficulty"
              checked={quizSettings.difficulty === 5}
              setChecked={() =>
                setQuizSettings({ ...quizSettings, difficulty: 5 })
              }
            />
          </div>
        </fieldset>
      </div>
      {error && (
        <p class="text-right text-xl font-bold italic text-rose-700">{error}</p>
      )}
      <div class="mt-4 flex w-full justify-end space-x-2">
        <button
          type="button"
          onClick={() => setQuizSettings(quizDefaults)}
          className="rounded-md bg-rose-600 px-5 py-3 text-lg font-bold tracking-wide text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Reset to Default
        </button>
        <button
          type="submit"
          className="rounded-md bg-fuchsia-600 px-5 py-3 text-lg font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
        >
          Start Quiz
        </button>
      </div>
    </form>
  );
}
