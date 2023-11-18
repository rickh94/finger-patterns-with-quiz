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
          patterns.push("Whole Steps Pattern");
          break;
        case "halfSteps":
          patterns.push("Half Steps Pattern");
          break;
        default:
          continue;
      }
    }
  }
  const percentage = Math.round((correct / (correct + incorrect)) * 100);
  let prompt = `Write a short, simple positive message giving feedback based on a quizScore of ${percentage}%.
It should be more positive the higher the score. No need to thank the user. Write at most 3 sentences. `;

  if (violinStrings.length > 0) {
    prompt += `tell the user to practice more on these strings: ${violinStrings.join(
      ", ",
    )}. (e.g. Practice more on the D and A strings.)`;
  }
  if (patterns.length > 0) {
    prompt += `tell the user to practice these patterns more: ${patterns.join(
      ", ",
    )}. (e.g. Practice the 1-2 Pattern more.)`;
  }

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    stream: false,
    temperature: 0.5,
    max_tokens: 80,
    prompt,
  });

  return new Response(
    response.choices[0]?.text.replace("\n", "").replace('"', ""),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
