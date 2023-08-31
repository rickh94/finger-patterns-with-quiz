import patterns, { type Pattern } from "./patterns";

export type Scale = {
  notes: string;
  patterns: {
    id: string;
    violinString: "G" | "D" | "A" | "E";
    pattern: Pattern;
  }[];
  offset: number;
  name: string;
  mode: string;
  key: string;
  extraTopNotes: number;
};

const scales: Scale[] = [
  {
    name: "G Major",
    key: "G",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Gmaj
G, A, B, C D E F G A B c d e f g |]
`,
    extraTopNotes: 2,
    offset: 0,
  },
  {
    name: "A Major",
    key: "A",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Amaj
A, B, C D E F G A B c d e f g a |]
`,
    extraTopNotes: 2,
    offset: 1,
  },
];

export default scales;
