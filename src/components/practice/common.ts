export enum PracticeMode {
  Setup,
  Display,
  Finished,
}

export type ViolinString = 'E' | 'A' | 'D' | 'G';
export type PatternId =
  | 'oneTwo'
  | 'twoThree'
  | 'threeFour'
  | 'wholeSteps'
  | 'halfSteps';
export type PatternPosition = 'low' | 'normal' | 'high';

export type SingleExerciseConfig = {
  violinString: ViolinString;
  pattern: PatternId;
  position: PatternPosition;
  numOfMeasures: number;
  includeOpen: boolean;
  index?: number;
};
