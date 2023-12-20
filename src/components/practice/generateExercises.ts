import type { SingleExerciseConfig, PatternId } from "./common";
import patternStringNotes from "./patternStringNotes";

function patternToNum(pattern: PatternId) {
  switch (pattern) {
    case "oneTwo":
      return 0;
    case "twoThree":
      return 1;
    case "threeFour":
      return 2;
    case "wholeSteps":
      return 3;
    case "halfSteps":
      return 4;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function numToPattern(num: any) {
  if (typeof num !== "number") {
    throw new Error(`invalid num: ${num}`);
  }
  switch (num) {
    case 0:
      return "oneTwo";
    case 1:
      return "twoThree";
    case 2:
      return "threeFour";
    case 3:
      return "wholeSteps";
    case 4:
      return "halfSteps";
    default:
      throw new Error(`invalid num: ${num}`);
  }
}

function posToNum(pos: PatternPosition) {
  switch (pos) {
    case "low":
      return 0;
    case "normal":
      return 1;
    case "high":
      return 2;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function numToPos(num: any) {
  if (typeof num !== "number") {
    throw new Error(`invalid num: ${num}`);
  }
  switch (num) {
    case 0:
      return "low";
    case 1:
      return "normal";
    case 2:
      return "high";
    default:
      throw new Error(`invalid num: ${num}`);
  }
}

function violinStringToNum(string: ViolinString) {
  switch (string) {
    case "G":
      return 0;
    case "D":
      return 1;
    case "A":
      return 2;
    case "E":
      return 3;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function numToViolinString(num: any) {
  if (typeof num !== "number") {
    throw new Error(`invalid num: ${num}`);
  }
  switch (num) {
    case 0:
      return "G";
    case 1:
      return "D";
    case 2:
      return "A";
    case 3:
      return "E";
  }
}

/*
 *
 * Encoding as array for compactness to limit length of url
 * 0: violinString as number
 * 1: pattern as number
 * 2: position as number
 * 3: numOfMeasures
 * 4: includeOpen
 */

export function createShareLink(configs: SingleExerciseConfig[]) {
  const encodedConfigObjects = configs.map((config) => [
    violinStringToNum(config.violinString),
    patternToNum(config.pattern),
    posToNum(config.position),
    config.numOfMeasures,
    config.includeOpen,
  ]);
  const query = new URLSearchParams();
  query.set("c", btoa(JSON.stringify(encodedConfigObjects)));
  return `${window.location.origin}${
    window.location.pathname
  }?${query.toString()}`;
}

export function decodeShareLink(): SingleExerciseConfig[] {
  const queryString = new URLSearchParams(window.location.search).get("c");
  if (!queryString) {
    return [];
  }
  const encodedConfigObjects = JSON.parse(atob(queryString)) as EncodedConfig[];
  return encodedConfigObjects.map((config) => {
    if (!(config instanceof Array) || config.length !== 5) {
      throw new Error(`invalid config: ${config}`);
    }
    if (typeof config[3] !== "number") {
      throw new Error(`invalid numOfMeasures: ${config[3]}`);
    }
    if (typeof config[4] !== "boolean") {
      throw new Error(`invalid includeOpen: ${config[4]}`);
    }
    return {
      violinString: numToViolinString(config[0]),
      pattern: numToPattern(config[1]),
      position: numToPos(config[2]),
      numOfMeasures: config[3],
      includeOpen: config[4],
    };
  });
}

const stringToABCMap = {
  G: "G,",
  D: "D",
  A: "A",
  E: "E'",
};

export function generateExercise(exerciseConfig: SingleExerciseConfig): string {
  const availableNotes =
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
  // let lastLastNoteIdx = -1;
  for (let i = 0; i < exerciseConfig.numOfMeasures * 4; i++) {
    // This will prevent the same note from being selected more than twice in a row.
    let randomIndex = Math.floor(Math.random() * availableNotes.length);
    while (randomIndex === lastNoteIdx) {
      randomIndex = Math.floor(Math.random() * availableNotes.length);
    }
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
  for (const config of exerciseConfigs) {
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
