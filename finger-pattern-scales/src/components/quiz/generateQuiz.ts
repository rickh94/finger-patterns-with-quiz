import { type QuestionInfo, type QuizSettings } from './common.ts';
import { allPossibleQuestions } from './allQuizQuestions.ts';

export default function generateQuiz(quizSettings: QuizSettings) {
  const questionPool: QuestionInfo[] = allPossibleQuestions.filter(
    (q) =>
      quizSettings.strings.includes(q.violinString) &&
      quizSettings.patterns.includes(q.patternId) &&
      q.difficulty <= quizSettings.difficulty
  );
  const selectedQuestions = [];
  for (let i = 0; i < quizSettings.numOfQuestions; i++) {
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    selectedQuestions.push(questionPool[randomIndex]);
  }
  console.log(selectedQuestions);
  return selectedQuestions;
}
