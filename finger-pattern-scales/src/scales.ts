import patterns, { type Pattern } from "./patterns";

type Scale = {
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
];

export default scales;
