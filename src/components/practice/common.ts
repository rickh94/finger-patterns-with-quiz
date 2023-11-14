export enum PracticeMode {
  Setup = "SETUP",
  Display = "DISPLAY",
  Finished = "FINISHED",
}

export type ViolinString = "E" | "A" | "D" | "G";
export type PatternId =
  | "oneTwo"
  | "twoThree"
  | "threeFour"
  | "wholeSteps"
  | "halfSteps";
export type PatternPosition = "low" | "normal" | "high";

export type SingleExerciseConfig = {
  violinString: ViolinString;
  pattern: PatternId;
  position: PatternPosition;
  numOfMeasures: number;
  includeOpen: boolean;
  id?: number;
};
