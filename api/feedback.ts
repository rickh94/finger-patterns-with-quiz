import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  const { correct, incorrect, missed } = await request.json();
  const violinStrings = [];

  for (let [vs, c] of Object.entries(missed.violinString)) {
    if ((c as number) >= 2) {
      violinStrings.push(vs);
    }
  }

  const patterns = [];
  for (let [p, c] of Object.entries(missed.patternId)) {
    if ((c as number) >= 2) {
      switch (p) {
        case "oneTwo":
          patterns.push("1-2 Pattern");
          break;
        case "twoThree":
          patterns.push("2-3 Pattern");
          break;
        case "threeFour":
          patterns.push("3-4 Pattern");
          break;
        case "wholeSteps":
          patterns.push("Whole Steps");
          break;
        case "halfSteps":
          patterns.push("Half Steps");
          break;
        default:
          continue;
      }
    }
  }
  const percentage = Math.round((correct / (correct + incorrect)) * 100);
  const prompt = `Write a short, simple positive message giving feedback based on a quizScore of ${percentage}%.
It should be more positive the higher the score. No need to thank the user. Then tell the user they need to practice more on the following:
Strings: ${violinStrings}, Patterns: ${patterns}. Use a phrase like 'You need to work more on the [string name] and [other string] strings.'
If there are no strings provided, skip that part. If there are no patterns provided, skip that part. A perfect score does not require a practice recommendation.
Write at most 3 short sentences.
`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: false,
    temperature: 0.5,
    max_tokens: 100,
    prompt,
  });

  console.log(response.choices[0]?.text.replace("\n", "").replace('"', ""));
  return new Response(
    response.choices[0]?.text.replace("\n", "").replace('"', ""),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
