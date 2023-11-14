export type PatternWidth = 4 | 16 | 20;
export type Pattern = {
  name: string;
  widths: [PatternWidth, PatternWidth, PatternWidth, PatternWidth];
  description?: string[];
  exercises?: { name: string; link: string }[];
  imageLink?: string;
  id: "oneTwo" | "twoThree" | "threeFour" | "wholeSteps" | "halfSteps";
  position: "low" | "normal" | "high";
};
// TODO: take and add images for each finger pattern, either replace or
// supplement diagram

type PatternList = {
  low: {
    oneTwo: Pattern;
    twoThree: Pattern;
    threeFour: Pattern;
    wholeSteps: Pattern;
    halfSteps: Pattern;
  };
  normal: {
    oneTwo: Pattern;
    twoThree: Pattern;
    threeFour: Pattern;
    wholeSteps: Pattern;
    halfSteps: Pattern;
  };
  high: {
    oneTwo: Pattern;
    twoThree: Pattern;
    threeFour: Pattern;
    wholeSteps: Pattern;
    halfSteps: Pattern;
  };
};

const patterns: PatternList = {
  low: {
    oneTwo: {
      name: "1-2 Pattern",
      widths: [4, 4, 16, 16],
      position: "low",
      id: "oneTwo",
    },
    twoThree: {
      name: "2-3 Pattern",
      widths: [4, 16, 4, 16],
      position: "low",
      id: "twoThree",
    },
    threeFour: {
      name: "3-4 Pattern",
      widths: [4, 16, 16, 4],
      position: "low",
      id: "twoThree",
    },
    wholeSteps: {
      name: "Whole Steps Pattern",
      widths: [4, 16, 16, 16],
      position: "low",
      id: "wholeSteps",
    },
    halfSteps: {
      name: "Half Steps Pattern",
      widths: [4, 4, 20, 4],
      position: "low",
      id: "halfSteps",
    },
  },
  normal: {
    oneTwo: {
      name: "1-2 Pattern",
      widths: [16, 4, 16, 16],
      description: [
        "The 1-2 Pattern has a half step between the first and " +
          "second fingers. They should be so close that they are touching. The " +
          "other fingers should be spaced in whole steps. You will often hear " +
          "this described as a “Low 2.”",
        "You will feel a stretch in your hand as you work to separate the second and " +
          "third fingers, whose internal connection makes them want to stay together.",
        "This pattern is usually the second pattern you learn as a student. " +
          "It is commonly seen in keys with G♮ and C♮, such as D major and G major, and later F♮ and B♭, " +
          "such as D minor and F major.",
      ],
      exercises: [
        {
          name: "Sevcik Op. 1 Book 1, Exercise 1",
          link: "https://imslp.org/wiki/School_of_Violin_Technique,_Op.1_(%C5%A0ev%C4%8D%C3%ADk,_Otakar)",
        },
        {
          name: "Sevcik Op. 1 Book 1, Exercise 4 (before the key change)",
          link: "https://imslp.org/wiki/School_of_Violin_Technique,_Op.1_(%C5%A0ev%C4%8D%C3%ADk,_Otakar)",
        },
      ],
      position: "normal",
      id: "oneTwo",
    },
    twoThree: {
      name: "2-3 Pattern",
      widths: [16, 16, 4, 16],
      description: [
        "The 2-3 Pattern has a half step between the second and " +
          "third fingers. They should be so close that they are touching. The " +
          "other fingers should be spaced in whole steps. You will often hear " +
          "this described as a “High 2” or “Normal 2.”",
        "This is the most comfortable pattern because you don’t have to fight " +
          "the natural connection between those fingers.",
        "For this reason, it is usually taugh first. It is the finger pattern of " +
          "‘Twinkle, Twinkle Little Star’ in A or D major.",
      ],
      exercises: [
        {
          name: "Sevcik - Op. 1 Book 1, Exercise 2",
          link: "https://imslp.org/wiki/School_of_Violin_Technique,_Op.1_(%C5%A0ev%C4%8D%C3%ADk,_Otakar)",
        },
        {
          name: "Schradieck - Book 1, Exercise 1",
          link: "https://imslp.org/wiki/School_of_Violin_Technics_(Schradieck,_Henry)",
        },
      ],
      position: "normal",
      id: "twoThree",
    },
    threeFour: {
      name: "3-4 Pattern",
      widths: [16, 16, 16, 4],
      position: "normal",
      id: "threeFour",
      description: [
        "The 3-4 Pattern has a half step between the third and fourth fingers. " +
          "They should be so close that they are touching. The other fingers " +
          "should be spaced in whole steps. Compared to the 2-3 Pattern, this " +
          "has a “High 3.” You will feel like you are stretching your third finger" +
          "compared to the 2-3 Pattern.",
        "This pattern is very common in both the normal version, and the low version " +
          "built from a low 1.",
        "In the normal version, you’ll see it in keys with lots of sharps, such as " +
          "A major (on the low strings) and E major. In the low version, you’ll find " +
          "it in the flat keys, such as F major, B♭ major, and D minor (on the E string).",
      ],
      exercises: [
        {
          name: "Sevcik - Op. 1 Book 1, Exercise 3",
          link: "https://imslp.org/wiki/School_of_Violin_Technique,_Op.1_(%C5%A0ev%C4%8D%C3%ADk,_Otakar)",
        },
        {
          name: "Sevcik - Op. 1 Book 1, Exercise 4 (after the key change)",
          link: "https://imslp.org/wiki/School_of_Violin_Technique,_Op.1_(%C5%A0ev%C4%8D%C3%ADk,_Otakar)",
        },
      ],
    },
    wholeSteps: {
      name: "Whole Steps Pattern",
      widths: [16, 16, 16, 16],
      position: "normal",
      id: "wholeSteps",
      description: [
        "The Whole Steps Pattern does not have any half steps, as the name suggests. " +
          "Place your fingers so none of them are touching. ",
        "To make the pattern, you can start in the 3-4 Pattern and extend the " +
          "fourth finger, giving you the normal version of this pattern, or start " +
          "from the 1-2 Pattern and lower the first finger, giving you the low " +
          " version. The high version might be described as “High 4” and the " +
          "version as “Low 1.”",
        "This comes up mostly in flat (in the low version), such as F major (on " +
          "the A string) and B♭ major (on the G string). You will also find it " +
          "in keys with lots of sharps like B major (on the A string) and " +
          "E major (on the G string).",
      ],
    },
    halfSteps: {
      name: "Half Steps Pattern",
      widths: [16, 4, 20, 4],
      description: [
        "The Half Steps Pattern has two half steps, but is not all half steps. " +
          "There is a half step between the first and second fingers, and a " +
          "half step between the third and fourth fingers. Between two and " +
          "three can be either a whole step, or a whole step plus a half step " +
          "(forming an Augmented 2nd). This is the least common pattern, " +
          "but it is also the least comfortable.",
        "You will rarely see this pattern in major keys, rather in minor keys, " +
          "such as harmonic and melodic minor scales, and sections with lots of " +
          "accidentals.",
      ],
      position: "normal",
      id: "halfSteps",
    },
  },
  high: {
    oneTwo: {
      name: "1-2 Pattern",
      widths: [20, 4, 16, 16],
      position: "high",
      id: "oneTwo",
    },
    twoThree: {
      name: "2-3 Pattern",
      widths: [20, 16, 4, 16],
      position: "high",
      id: "twoThree",
    },
    threeFour: {
      name: "3-4 Pattern",
      widths: [20, 16, 16, 4],
      position: "high",
      id: "threeFour",
    },
    wholeSteps: {
      name: "Whole Steps Pattern",
      widths: [20, 16, 16, 16],
      position: "high",
      id: "wholeSteps",
    },
    halfSteps: {
      name: "Half Steps Pattern",
      widths: [20, 4, 20, 4],
      position: "high",
      id: "halfSteps",
    },
  },
};

export default patterns;
