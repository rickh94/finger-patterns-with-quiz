export enum QuizMode {
  Setup,
  Results,
  Taking,
}

export type ViolinString = 'E' | 'A' | 'D' | 'G';
export type PatternId =
  | 'oneTwo'
  | 'twoThree'
  | 'threeFour'
  | 'wholeSteps'
  | 'halfSteps';
export type PatternPosition = 'low' | 'normal' | 'high';

export type QuizSettings = {
  numOfQuestions: number;
  strings: ViolinString[];
  patterns: PatternId[];
  inOrder: boolean;
  difficulty: number;
};

export type QuestionInfo = {
  notes: string;
  patternId: PatternId;
  violinString: ViolinString;
  patternPosition: PatternPosition;
  difficulty: number;
};

export type QuizResultsInfo = {
  correct: number;
  incorrect: number;
  missed: {
    violinString: {
      E: number;
      A: number;
      D: number;
      G: number;
    };
    patternId: {
      oneTwo: number;
      twoThree: number;
      threeFour: number;
      wholeSteps: number;
      halfSteps: number;
    };
    patternPosition: {
      low: number;
      normal: number;
      high: number;
    };
  };
};

export const quizDefaults: QuizSettings = {
  numOfQuestions: 10,
  strings: ['E', 'A', 'D', 'G'],
  patterns: ['oneTwo', 'twoThree', 'threeFour', 'wholeSteps', 'halfSteps'],
  inOrder: true,
  difficulty: 3,
};

export const quizResultsBlank: QuizResultsInfo = {
  correct: 0,
  incorrect: 0,
  missed: {
    violinString: {
      E: 0,
      A: 0,
      D: 0,
      G: 0,
    },
    patternId: {
      oneTwo: 0,
      twoThree: 0,
      threeFour: 0,
      wholeSteps: 0,
      halfSteps: 0,
    },
    patternPosition: {
      low: 0,
      normal: 0,
      high: 0,
    },
  },
};
