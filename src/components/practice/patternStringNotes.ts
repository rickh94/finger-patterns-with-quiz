export default {
  E: {
    oneTwo: {
      low: ['f', '_g', '_a', '_b'],
      normal: ['^f', 'g', 'a', 'b'],
      high: ['^^f', '^g', '^a', '^b'],
    },
    twoThree: {
      low: ['f', 'g', '_a', '_b'],
      normal: ['^f', '^g', 'a', 'b'],
      high: ['^^f', '^^g', '^a', '^b'],
    },
    threeFour: {
      low: ['f', 'g', 'a', '_b'],
      normal: ['^f', '^g', '^a', 'b'],
      high: ['^^f', '^^g', '^^a', '^b'],
    },
    wholeSteps: {
      low: ['f', 'g', 'a', 'b'],
      normal: ['^f', '^g', '^a', '^b'],
      high: ['^^f', '^^g', '^^a', '^^b'],
    },
    halfSteps: {
      low: ['f', '_g', 'a', '_b'],
      normal: ['^f', 'g', '^a', 'b'],
      high: ['^^f', '^g', '^^a', '^b'],
    },
  },
  A: {
    oneTwo: {
      low: ['_B', '_c', '_d', '_e'],
      normal: ['B', 'c', 'd', 'e'],
      high: ['^B', '^c', '^d', '^e'],
    },
    twoThree: {
      low: ['_B', 'c', '_d', '_e'],
      normal: ['B', '^c', 'd', 'e'],
      high: ['^B', '^^c', '^d', '^e'],
    },
    threeFour: {
      low: ['_B', 'c', 'd', '_e'],
      normal: ['B', '^c', '^d', 'e'],
      high: ['^B', '^^c', '^^d', '^e'],
    },
    wholeSteps: {
      low: ['_B', 'c', 'd', 'e'],
      normal: ['B', '^c', '^d', '^e'],
      high: ['^B', '^^c', '^^d', '^^e'],
    },
    halfSteps: {
      low: ['_B', '_c', 'd', '_e'],
      normal: ['B', 'c', '^d', 'e'],
      high: ['^B', '^c', '^^d', '^e'],
    },
  },
  D: {
    oneTwo: {
      low: ['_E', '_F', '_G', '_A'],
      normal: ['E', 'F', 'G', 'A'],
      high: ['^E', '^F', '^G', '^A'],
    },
    twoThree: {
      low: ['_E', 'F', '_G', '_A'],
      normal: ['E', '^F', 'G', 'A'],
      high: ['^E', '^^F', '^G', '^A'],
    },
    threeFour: {
      low: ['_E', 'F', 'G', '_A'],
      normal: ['E', '^F', '^G', 'A'],
      high: ['^E', '^^F', '^^G', '^A'],
    },
    wholeSteps: {
      low: ['_E', 'F', 'G', 'A'],
      normal: ['E', '^F', '^G', '^A'],
      high: ['^E', '^^F', '^^G', '^^A'],
    },
    halfSteps: {
      low: ['_E', '_F', 'G', '_A'],
      normal: ['E', 'F', '^G', 'A'],
      high: ['^E', '^F', '^^G', '^A'],
    },
  },
  G: {
    oneTwo: {
      low: ['__A,', '__B,', '_C', '_D'],
      normal: ['A,', '_B,', 'C', 'D'],
      high: ['^A,', 'B,', '^C', '^D'],
    },
    twoThree: {
      low: ['_A,', '_B,', '_C', '_D'],
      normal: ['A,', 'B,', 'C', 'D'],
      high: ['^A,', '^B,', '^C', '^D'],
    },
    threeFour: {
      low: ['_A,', '_B,', 'C', '_D'],
      normal: ['A,', 'B,', '^C', 'D'],
      high: ['^A,', '^B,', '^^C', '^D'],
    },
    wholeSteps: {
      low: ['_A,', '_B,', 'C', 'D'],
      normal: ['A,', 'B,', '^C', '^D'],
      high: ['^A,', '^B,', '^^C', '^^D'],
    },
    halfSteps: {
      low: ['_A,', '__B,', 'C', '_D'],
      normal: ['A,', '_B,', '^C', 'D'],
      high: ['^A,', 'B,', '^^C', '^D'],
    },
  },
};
