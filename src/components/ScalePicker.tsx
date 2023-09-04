import { Fragment } from 'preact';
import scales, { type Scale } from '../scales';
import { useStore } from '@nanostores/preact';
import { scaleMenuOpen } from '../stores';
import { useState } from 'preact/hooks';
import { Transition, Dialog } from '@headlessui/react';

export default function ScalePicker() {
  const $scaleMenuOpen = useStore(scaleMenuOpen);
  const [modeSelected, setModeSelected] = useState<
    'major' | 'melodic' | 'minor'
  >('major');

  return (
    <Transition.Root show={$scaleMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => scaleMenuOpen.set(false)}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div class="relative z-50 flex w-full items-center justify-between">
                  <div class="text-2xl font-bold">Scales</div>
                  <button
                    class="rounded border-2 border-white"
                    onClick={() => scaleMenuOpen.set(false)}
                  >
                    <span class="sr-only">Close Navigation</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <nav
                  class="relative z-50 mx-auto mt-4 grid w-full grid-cols-2 gap-y-4 text-center"
                  aria-label="primary"
                >
                  <div class="col-span-2 flex items-center justify-center">
                    <button
                      className={
                        modeSelected === 'major'
                          ? 'mr-4 border-b-2 border-fuchsia-800 text-fuchsia-800'
                          : 'mr-4 border-b-2 border-transparent text-black'
                      }
                      onClick={() => setModeSelected('major')}
                    >
                      Major
                    </button>{' '}
                    |{' '}
                    <button
                      className={
                        modeSelected === 'melodic'
                          ? 'mx-4 border-b-2 border-fuchsia-800 text-fuchsia-800'
                          : 'mx-4 border-b-2 border-transparent text-black'
                      }
                      onClick={() => setModeSelected('melodic')}
                    >
                      Melodic Minor
                    </button>
                    |{' '}
                    <button
                      className={
                        modeSelected === 'minor'
                          ? 'ml-4 border-b-2 border-fuchsia-800 text-fuchsia-800'
                          : 'ml-4 border-b-2 border-transparent text-black'
                      }
                      onClick={() => setModeSelected('minor')}
                    >
                      Natural Minor
                    </button>
                  </div>
                  {modeSelected === 'major' && <MajorScales />}
                  {modeSelected === 'melodic' && <MelodicScales />}
                  {modeSelected === 'minor' && <MinorScales />}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function MajorScales() {
  return (
    <>
      {scales.map(
        (scale: Scale) =>
          scale.mode == 'major' && (
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="text-fuchsia-800 underline hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
          )
      )}
    </>
  );
}

function MinorScales() {
  return (
    <>
      {scales.map(
        (scale: Scale) =>
          scale.mode == 'minor' && (
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="text-fuchsia-800 underline hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
          )
      )}
    </>
  );
}

function MelodicScales() {
  return (
    <>
      {scales.map(
        (scale: Scale) =>
          scale.mode == 'melodic' && (
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="text-fuchsia-800 underline hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
          )
      )}
    </>
  );
}
