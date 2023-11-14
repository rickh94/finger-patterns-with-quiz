import type { SingleExerciseConfig, PatternId } from "./common";
import patternStringNotes from "./patternStringNotes";

const stringToABCMap = {
  G: "G,",
  D: "D",
  A: "A",
  E: "E'",
};

export function generateExercise(exerciseConfig: SingleExerciseConfig): string {
  let availableNotes =
    patternStringNotes[exerciseConfig.violinString][exerciseConfig.pattern][
      exerciseConfig.position
    ].slice();
  if (exerciseConfig.includeOpen) {
    availableNotes.push(stringToABCMap[exerciseConfig.violinString]);
  }
  let exerciseNotes = `L: 1/4
K: Cmaj
`;
  let lastNoteIdx = -1;
  let lastLastNoteIdx = -1;
  for (let i = 0; i < exerciseConfig.numOfMeasures * 4; i++) {
    // This will prevent the same note from being selected more than twice in a row.
    let randomIndex = Math.floor(Math.random() * availableNotes.length);
    while (lastNoteIdx === lastLastNoteIdx && randomIndex === lastNoteIdx) {
      randomIndex = Math.floor(Math.random() * availableNotes.length);
    }
    lastLastNoteIdx = lastNoteIdx;
    lastNoteIdx = randomIndex;
    if (i !== 0 && i % 4 === 0) {
      exerciseNotes += " | ";
    }
    exerciseNotes += availableNotes[randomIndex];
    exerciseNotes += " ";
  }
  exerciseNotes += "|]";
  return exerciseNotes;
}

export default function generateExercises(
  exerciseConfigs: SingleExerciseConfig[],
): string[] {
  const exercises = [];
  for (let config of exerciseConfigs) {
    exercises.push(generateExercise(config));
  }
  return exercises;
}

export function generateExerciseConfigsFromQuery(): SingleExerciseConfig[] {
  // get the pattern id from the window url query string
  const patternId = new URLSearchParams(window.location.search).get(
    "patternId",
  );
  if (!patternId) {
    return [];
  } else if (
    !["oneTwo", "twoThree", "threeFour", "wholeSteps", "halfSteps"].includes(
      patternId,
    )
  ) {
    console.error("invalid query string");
    return [];
  } else {
    return [
      {
        violinString: "E",
        pattern: patternId as PatternId,
        position: "normal",
        numOfMeasures: 4,
        includeOpen: true,
      },
      {
        violinString: "A",
        pattern: patternId as PatternId,
        position: "normal",
        numOfMeasures: 4,
        includeOpen: true,
      },
      {
        violinString: "D",
        pattern: patternId as PatternId,
        position: "normal",
        numOfMeasures: 4,
        includeOpen: true,
      },
      {
        violinString: "G",
        pattern: patternId as PatternId,
        position: "normal",
        numOfMeasures: 4,
        includeOpen: true,
      },
    ];
  }
}
