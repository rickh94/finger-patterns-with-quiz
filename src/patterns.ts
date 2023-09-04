export type PatternWidth = 4 | 16 | 20;
export type Pattern = {
  name: string;
  widths: [PatternWidth, PatternWidth, PatternWidth, PatternWidth];
};

type PatternList = {
  low: { [s: string]: Pattern };
  normal: { [s: string]: Pattern };
  high: { [s: string]: Pattern };
};

const patterns: PatternList = {
  low: {
    oneTwo: {
      name: '1-2 Pattern',
      widths: [4, 4, 16, 16],
    },
    twoThree: {
      name: '2-3 Pattern',
      widths: [4, 16, 4, 16],
    },
    threeFour: {
      name: '3-4 Pattern',
      widths: [4, 16, 16, 4],
    },
    wholeSteps: {
      name: 'Whole Steps Pattern',
      widths: [4, 16, 16, 16],
    },
    halfSteps: {
      name: 'Half Steps Pattern',
      widths: [4, 4, 20, 4],
    },
  },
  normal: {
    oneTwo: {
      name: '1-2 Pattern',
      widths: [16, 4, 16, 16],
    },
    twoThree: {
      name: '2-3 Pattern',
      widths: [16, 16, 4, 16],
    },
    threeFour: {
      name: '3-4 Pattern',
      widths: [16, 16, 16, 4],
    },
    wholeSteps: {
      name: 'Whole Steps Pattern',
      widths: [16, 16, 16, 16],
    },
    halfSteps: {
      name: 'Half Steps Pattern',
      widths: [16, 4, 20, 4],
    },
  },
  high: {
    oneTwo: {
      name: '1-2 Pattern',
      widths: [20, 4, 16, 16],
    },
    twoThree: {
      name: '2-3 Pattern',
      widths: [20, 16, 4, 16],
    },
    threeFour: {
      name: '3-4 Pattern',
      widths: [20, 16, 16, 4],
    },
    wholeSteps: {
      name: 'Whole Steps Pattern',
      widths: [20, 16, 16, 16],
    },
    halfSteps: {
      name: 'Half Steps Pattern',
      widths: [20, 4, 20, 4],
    },
  },
};

export default patterns;
