import { PracticeMode, type SingleExerciseConfig } from "./practice/common";
import PracticeSetup from "./practice/modes/PracticeSetup";
import PracticeFinished from "./practice/modes/PracticeFinished";
import PracticeDisplay from "./practice/modes/PracticeDisplay";
import { useState } from "preact/hooks";
import generateExercises from "./practice/generateExercises";

export default function Quiz() {
  const [mode, setMode] = useState<PracticeMode>(PracticeMode.Setup);
  const [exerciseConfigs, setExerciseConfigs] = useState<
    SingleExerciseConfig[]
  >([]);
  const [exercises, setExercises] = useState<string[]>([]);
  const [currentExerciseIdx, setExerciseIdx] = useState(0);

  function generate() {
    setExercises(generateExercises(exerciseConfigs));
  }

  function startPracticing() {
    generate();
    setExerciseIdx(0);
    setMode(PracticeMode.Display);
  }

  function finish() {
    setMode(PracticeMode.Finished);
  }

  function regenerate() {
    generate();
    setExerciseIdx(0);
    setMode(PracticeMode.Display);
  }

  function restart() {
    setExerciseIdx(0);
    setMode(PracticeMode.Display);
  }

  function reconfigure() {
    setMode(PracticeMode.Setup);
  }

  function clear() {
    setExerciseConfigs([]);
    setExercises([]);
  }

  function nextExercise(): void {
    if (currentExerciseIdx >= exercises.length - 1) {
      return;
    }
    setExerciseIdx((curr) => curr + 1);
  }

  function hasNextExercise(): boolean {
    return currentExerciseIdx < exercises.length - 1;
  }

  function prevExercise(): void {
    if (currentExerciseIdx <= 0) {
      return;
    }
    setExerciseIdx((curr) => curr - 1);
  }

  function hasPrevExercise(): boolean {
    return currentExerciseIdx > 0;
  }

  return (
    // this is a jsx switch case hack. why don't i like jsx?
    <>
      {
        {
          [PracticeMode.Setup]: (
            <PracticeSetup
              startPracticing={startPracticing}
              exerciseConfigs={exerciseConfigs}
              setExerciseConfigs={setExerciseConfigs}
              clear={clear}
            />
          ),
          [PracticeMode.Display]: (
            <PracticeDisplay
              exerciseConfigs={exerciseConfigs}
              exercises={exercises}
              finish={finish}
              reconfigure={reconfigure}
              currentExerciseIdx={currentExerciseIdx}
              nextExercise={nextExercise}
              hasNextExercise={hasNextExercise}
              prevExercise={prevExercise}
              hasPrevExercise={hasPrevExercise}
            />
          ),
          [PracticeMode.Finished]: (
            <PracticeFinished
              restart={restart}
              regenerate={regenerate}
              reconfigure={reconfigure}
              exerciseConfigs={exerciseConfigs}
            />
          ),
        }[mode]
      }
    </>
  );
}
