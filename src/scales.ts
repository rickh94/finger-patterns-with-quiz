import patterns, { type Pattern } from "~/patterns";

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
!0!G, A, B, C D E F G A B c d e f g |]
`,
    extraTopNotes: 2,
    offset: 0,
  },
  {
    name: "A♭ Major",
    key: "Aflat",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Abmaj
A, B, C D E F G A B c d e f g a |]
`,
    extraTopNotes: 2,
    offset: 1,
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
  {
    name: "B♭ Major",
    key: "Bflat",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Bbmaj
B, C D E F G A B c d e f g a b |]
`,
    extraTopNotes: 2,
    offset: 2,
  },
  {
    name: "B Major",
    key: "B",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.high.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Bmaj
B, C D E F G A B c d e f g a b |]
`,
    extraTopNotes: 2,
    offset: 2,
  },
  {
    name: "C Major",
    key: "C",
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
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.wholeSteps,
      },
    ],
    notes: `
L: 1/4
K: Cmaj
C D E F G A B c d e f g a !4!b !4!c' |]
`,
    extraTopNotes: 2,
    offset: 3,
  },
  {
    name: "C♯ Major",
    key: "Csharp",
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
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.wholeSteps,
      },
    ],
    notes: `
L: 1/4
K: C#maj
C D E F G A B c d e f g a !4!b !4!c' |]
`,
    extraTopNotes: 2,
    offset: 3,
  },
  {
    name: "D Major",
    key: "D",
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
        pattern: patterns.normal.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Dmaj
D E F G A B c d |]
`,
    extraTopNotes: 2,
    offset: 4,
  },
  {
    name: "E♭ Major",
    key: "Eflat",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Ebmaj
E F G A B c d e |]
`,
    extraTopNotes: 2,
    offset: 5,
  },
  {
    name: "E Major",
    key: "E",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Emaj
E F G A B c d e |]
`,
    extraTopNotes: 2,
    offset: 5,
  },
  {
    name: "F Major",
    key: "F",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Fmaj
F G A B c d e f |]
`,
    extraTopNotes: 2,
    offset: 6,
  },
  {
    name: "G♭ Major",
    key: "Gflat",
    mode: "major",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Gbmaj
G A B c d e f g |]
`,
    extraTopNotes: 2,
    offset: 7,
  },
  {
    name: "G Melodic Minor",
    key: "G",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Gmin
!0!G, A, B, C D =E ^F G A B c d =e ^f g |]
`,
    extraTopNotes: 2,
    offset: 0,
  },
  {
    name: "G Minor",
    key: "G",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Gmin
!0!G, A, B, C D E F G A B c d e f g |]
`,
    extraTopNotes: 2,
    offset: 0,
  },
  {
    // TODO: note the special case somewhere
    name: "G♯ Melodic Minor",
    key: "Gsharp",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.high.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.high.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.high.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: G#min
!1!G, !2!A, !2!B, C D ^E ^^F G A B c d ^e ^^f g |]
`,
    extraTopNotes: 2,
    offset: 0,
  },
  {
    // TODO: note the special case somewhere
    name: "G♯  Minor",
    key: "Gsharp",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.high.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.threeFour,
      },
    ],
    notes: `
L: 1/4
K: G#min
!1!G, !2!A, !2!B, C D E F G A B c d e f g |]
`,
    extraTopNotes: 2,
    offset: 0,
  },
  {
    name: "A Melodic Minor",
    key: "A",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.twoThree,
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
K: Amin
A, B, C D E ^F ^G A B c d e ^f ^g a |]
`,
    extraTopNotes: 2,
    offset: 1,
  },
  {
    name: "A Minor",
    key: "A",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.wholeSteps,
      },
    ],
    notes: `
L: 1/4
K: Amin
A, B, C D E F G A B c d e f g a |]
`,
    extraTopNotes: 2,
    offset: 1,
  },
  {
    name: "B♭ Melodic Minor",
    key: "Bflat",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.halfSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Bbmin
B, C D E F =G =A B c d e f =g =a b |]
`,
    extraTopNotes: 2,
    offset: 2,
  },
  {
    name: "B♭ Minor",
    key: "Bflat",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Bbmin
B, C D E F G A B c d e f g a b |]
`,
    extraTopNotes: 2,
    offset: 2,
  },
  {
    name: "B Melodic Minor",
    key: "B",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.high.halfSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Bmin
B, C D E F ^G ^A B c d e f ^g ^a b |]
`,
    extraTopNotes: 2,
    offset: 2,
  },
  {
    name: "B Minor",
    key: "B",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Bmin
B, C D E F G A B c d e f g a b |]
`,
    extraTopNotes: 2,
    offset: 2,
  },
  {
    name: "C Melodic Minor",
    key: "C",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.halfSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.wholeSteps,
      },
    ],
    notes: `
L: 1/4
K: Cmin
C D E F G =A =B c d e f g =a !4!=b !4!c' |]
`,
    extraTopNotes: 2,
    offset: 3,
  },
  {
    name: "C Minor",
    key: "C",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Cmin
C D E F G A B c d e f g a !4!b !4!c' |]
`,
    extraTopNotes: 2,
    offset: 3,
  },
  {
    name: "C♯ Melodic Minor",
    key: "Csharp",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.high.halfSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.wholeSteps,
      },
    ],
    notes: `
L: 1/4
K: C#min
C D E F G ^A ^B c d e f g ^a !4!^b !4!c' |]
`,
    extraTopNotes: 2,
    offset: 3,
  },
  {
    name: "C♯ Minor",
    key: "Csharp",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.twoThree,
      },
    ],
    notes: `
L: 1/4
K: C#min
C D E F G A B c d e f g a !4!b !4!c' |]
`,
    extraTopNotes: 2,
    offset: 3,
  },
  {
    name: "D Melodic Minor",
    key: "D",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.wholeSteps,
      },
    ],
    notes: `
L: 1/4
K: Dmin
D E F G A =B ^c d |]
`,
    extraTopNotes: 2,
    offset: 4,
  },
  {
    name: "D Minor",
    key: "D",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.oneTwo,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.threeFour,
      },
    ],
    notes: `
L: 1/4
K: Dmin
D E F G A B c d |]
`,
    extraTopNotes: 2,
    offset: 4,
  },
  {
    name: "E♭ Melodic Minor",
    key: "Eflat",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Ebmin
E F G A B =c =d e |]
`,
    extraTopNotes: 2,
    offset: 5,
  },
  {
    name: "E♭ Minor",
    key: "Eflat",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.twoThree,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.low.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.oneTwo,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Ebmin
E F G A B c d e |]
`,
    extraTopNotes: 2,
    offset: 5,
  },
  {
    name: "E Melodic Minor",
    key: "E",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.twoThree,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.oneTwo,
      },
    ],
    notes: `
L: 1/4
K: Emin
E F G A B ^c ^d e |]
`,
    extraTopNotes: 2,
    offset: 5,
  },
  {
    name: "E Minor",
    key: "E",
    mode: "minor",
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
K: Emin
E F G A B c d e |]
`,
    extraTopNotes: 2,
    offset: 5,
  },
  {
    name: "F Melodic Minor",
    key: "F",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.halfSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.wholeSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Fmin
F G A B c =d =e f |]
`,
    extraTopNotes: 2,
    offset: 6,
  },
  {
    name: "F Minor",
    key: "F",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.low.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.low.twoThree,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.low.twoThree,
      },
    ],
    notes: `
L: 1/4
K: Fmin
F G A B c d e f |]
`,
    extraTopNotes: 2,
    offset: 6,
  },
  {
    name: "F♯ Melodic Minor",
    key: "Fsharp",
    mode: "melodic",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.high.halfSteps,
      },
      {
        id: "2",
        violinString: "A",
        pattern: patterns.normal.wholeSteps,
      },
      {
        id: "3",
        violinString: "E",
        pattern: patterns.normal.twoThree,
      },
    ],
    notes: `
L: 1/4
K: F#min
F G A B c ^d ^e f |]
`,
    extraTopNotes: 2,
    offset: 6,
  },
  {
    name: "F♯ Minor",
    key: "Fsharp",
    mode: "minor",
    patterns: [
      {
        id: "0",
        violinString: "G",
        pattern: patterns.normal.threeFour,
      },
      {
        id: "1",
        violinString: "D",
        pattern: patterns.high.threeFour,
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
K: F#min
F G A B c d e f |]
`,
    extraTopNotes: 2,
    offset: 6,
  },
];

// TODO: add a field for text notes about the scale, staff width for one vs two octave scales
// TODO: note to use natural minor on the way down the scale.

export default scales;
