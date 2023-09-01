export enum QuizMode {
  Setup,
  Results,
  Taking,
}

export type ViolinString = "E" | "A" | "D" | "G";
export type PatternId = "12" | "23" | "34" | "W" | "H";

export type QuizSettings = {
  numOfQuestions: number;
  strings: ViolinString[];
  patterns: PatternId[];
  inOrder: boolean;
};

export type QuizQuestion = {};

export const quizDefaults: QuizSettings = {
  numOfQuestions: 10,
  strings: ["E", "A", "D", "G"],
  patterns: ["12", "23", "34", "W", "H"],
  inOrder: true,
};
