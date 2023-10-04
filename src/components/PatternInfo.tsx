import { Fragment } from 'preact';
import { useStore } from '@nanostores/preact';
import { moreInfoOpen, moreInfoPatternId } from '../stores.ts';
import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import FingerDisplay from './FingerDisplay.tsx';
import patterns from '../patterns.ts';
// TODO: add link to exercise generator when implemented

export default function PatternInfo() {
  const $open = useStore(moreInfoOpen);
  const $patternId = useStore(moreInfoPatternId);

  function patternDescription() {
    if (!$patternId) {
      return '';
    }
    const desc = patterns.normal[$patternId]?.description;
    if (!desc) {
      return '';
    }
    return (
      <>
        {desc.map((para: string) => (
          <p>{para}</p>
        ))}
      </>
    );
  }

  function patternExercises() {
    if (!$patternId) {
      return '';
    }
    const exercises = patterns.normal[$patternId]?.exercises;
    if (!exercises) {
      return '';
    }
    return (
      <>
        <h4 class="text-xl font-bold">Exercises</h4>
        <ul>
          {exercises.map(({ name, link }: { name: string; link: string }) => (
            <li class="mb-1">
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                class="border-b-2 border-fuchsia-600 hover:text-fuchsia-600"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <Transition.Root show={$open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          moreInfoOpen.set(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="overlay fixed inset-0 bg-fuchsia-200 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="relative z-50 flex w-full items-center justify-between">
                  <div class="text-2xl font-bold">
                    {$patternId && patterns.normal[$patternId].name}
                  </div>
                  <button
                    class="rounded border-2 border-white hover:text-rose-500 focus:text-rose-500 focus:ring-2 focus:ring-rose-500"
                    onClick={() => {
                      moreInfoOpen.set(false);
                      window.location.href =
                        window.location.origin + window.location.pathname;
                    }}
                  >
                    <span class="sr-only">Close Navigation</span>
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </div>
                <div
                  class="relative z-50 mx-auto mt-4 flex w-full flex-col gap-2 text-left"
                  aria-label="primary"
                >
                  {$patternId && (
                    <FingerDisplay
                      baseId={$patternId + '-pattern-more-info'}
                      radius={2}
                      widths={patterns.normal[$patternId].widths}
                    />
                  )}

                  <div class="my-2">
                    <a
                      href={`/practice?patternId=${$patternId}`}
                      className="rounded-md bg-fuchsia-600 px-3 py-2 font-bold tracking-wide text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
                    >
                      Practice Now
                    </a>
                  </div>
                  {patternDescription()}
                  {patternExercises()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
