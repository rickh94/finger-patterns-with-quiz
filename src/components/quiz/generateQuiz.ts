import { type QuestionInfo, type QuizSettings } from "./common";
import { allPossibleQuestions } from "./allQuizQuestions";

export default function generateQuiz(
  quizSettings: QuizSettings,
): QuestionInfo[] {
  const questionPool: QuestionInfo[] = allPossibleQuestions.filter(
    (q) =>
      quizSettings.strings.includes(q.violinString) &&
      quizSettings.patterns.includes(q.patternId) &&
      q.difficulty <= quizSettings.difficulty,
  );
  const selectedQuestions = [];
  for (let i = 0; i < quizSettings.numOfQuestions; i++) {
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    const question = questionPool[randomIndex];
    if (!question) {
      continue;
    }
    selectedQuestions.push(question);
  }
  return selectedQuestions;
}
