import { useState, useEffect } from 'preact/hooks';
import {
  type QuestionInfo,
  type PatternId,
  type QuizSettings,
} from '../common';
import patterns from '../../../patterns';
import FingerDisplay from '../../FingerDisplay';
import NotesDisplay from '../../NotesDisplay';

type QuizQuestionProps = {
  question: QuestionInfo;
  quizSettings: QuizSettings;
  recordAnswer: (answer: PatternId) => void;
  questionNumber: number;
  canAdvance: boolean;
  advanceQuestion: () => void;
};

export default function QuizQuestion({
  question,
  recordAnswer,
  questionNumber,
  canAdvance,
  advanceQuestion,
  quizSettings,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<PatternId | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [question, questionNumber]);

  function handleAnswer(answer: string) {
    setSelected(answer as PatternId);
    recordAnswer(answer as PatternId);
  }

  function answerClasses(key: string) {
    if (!selected) {
      return '';
    }
    if (key === question.patternId) {
      return ' ring-2 ring-emerald-700 border-emerald-700';
    }
    if (selected === key) {
      return ' ring-2 ring-rose-700 border-rose-700';
    }
  }

  function responseText(key: string) {
    if (!selected) {
      return '';
    }
    if (selected === key && key === question.patternId) {
      return <span class="font-bold text-emerald-700"> — Correct!</span>;
    }
    if (selected === key) {
      return <span class="font-bold text-rose-700"> — Incorrect</span>;
    }
    if (key === question.patternId) {
      return <span class="italic text-emerald-700"> — Correct Answer</span>;
    }
  }

  function makeNotes() {
    if (quizSettings.inOrder) {
      return `K: Cmaj 
L: 1/4
${question.notes} |]`;
    } else {
      const notes = shuffle(question.notes.split(' '));
      return `K: Cmaj
L: 1/4
${notes.join(' ')} |]`;
    }
  }

  // TODO: implement note scrambling
  // TODO: fix notes display width
  return (
    <>
      <h2 class="mb-2 text-center text-2xl font-bold">
        Which Pattern matches these notes?
      </h2>
      <div class="mx-auto max-w-4xl">
        <div className="my-4 flex w-full justify-center">
          <NotesDisplay
            baseId={`${questionNumber}-question`}
            notes={makeNotes()}
            offset={0}
            disabled={true}
          />
        </div>
        <div class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.keys(patterns[question.patternPosition]).map((key) => {
            const name =
              patterns[question.patternPosition][key as PatternId]?.name;
            const widths =
              patterns[question.patternPosition][key as PatternId]?.widths;
            if (!name || !widths) {
              return null;
            }

            return (
              <button
                type="button"
                className={`relative flex cursor-pointer flex-col rounded-lg border bg-white p-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700${answerClasses(
                  key
                )}`}
                disabled={!!selected}
                onClick={() => handleAnswer(key)}
              >
                <h2 class="text-xl tracking-wide">
                  {name}
                  {responseText(key)}
                </h2>
                <FingerDisplay
                  baseId={`${questionNumber}-${key}`}
                  radius={2}
                  widths={widths}
                  disabled={true}
                />
              </button>
            );
          })}
          <button
            type="button"
            className={`rounded px-4 py-2 text-2xl font-semibold text-white ${canAdvance
                ? ' pointer-events-auto bg-fuchsia-600 shadow-lg hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600'
                : ' pointer-events-none bg-gray-600'
              }`}
            disabled={!canAdvance}
            onClick={advanceQuestion}
          >
            Next Question
          </button>
        </div>
      </div>
    </>
  );
}

function shuffle(array: (string | undefined)[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
