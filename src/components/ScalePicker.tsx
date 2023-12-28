import { Fragment } from "preact";
import scales, { type Scale } from "../scales";
import { useStore } from "@nanostores/preact";
import { scaleMenuOpen } from "../stores";
import { useState } from "preact/hooks";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "~/util";
import Link from "~/components/Link";

type Tab = {
  name: string;
  id: string;
};

const TABS: Tab[] = [
  { name: "Major", id: "major" },
  { name: "Natural Minor", id: "minor" },
  { name: "Melodic Minor", id: "melodic" },
];

export default function ScalePicker() {
  const $scaleMenuOpen = useStore(scaleMenuOpen);
  const [currentTab, setCurrentTab] = useState<Tab>(TABS[0]!);

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
                    class="rounded border-2 border-white hover:text-rose-500 focus:text-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500"
                    onClick={() => scaleMenuOpen.set(false)}
                  >
                    <span class="sr-only">Close Navigation</span>
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </div>

                <div>
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white sm:text-sm"
                      defaultValue={currentTab.id}
                    >
                      {TABS.map((tab) => (
                        <option
                          key={tab.id}
                          value={tab.id}
                          onSelect={() => setCurrentTab(tab)}
                        >
                          {tab.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex gap-x-4" aria-label="Tabs">
                        {TABS.map((tab) => (
                          <button
                            key={tab.name}
                            onClick={() => setCurrentTab(tab)}
                            className={cn(
                              currentTab.id === tab.id
                                ? "border-fuchsia-500 text-fuchsia-600"
                                : "border-transparent text-black hover:border-fuchsia-300 hover:text-fuchsia-500",
                              "whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white",
                            )}
                            aria-current={
                              currentTab.id === tab.id ? "page" : undefined
                            }
                          >
                            {tab.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
                <nav className="relative z-50 mx-auto mt-4 grid w-full grid-cols-2 gap-y-4 text-left">
                  {currentTab.id === "major" && <MajorScales />}
                  {currentTab.id === "minor" && <MinorScales />}
                  {currentTab.id === "melodic" && <MelodicScales />}
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
          scale.mode == "major" && (
            <Link href={`/scales/${scale.key}/${scale.mode}`}>
              {scale.name}
            </Link>
          ),
      )}
    </>
  );
}

function MinorScales() {
  return (
    <>
      {scales.map(
        (scale: Scale) =>
          scale.mode == "minor" && (
            <Link href={`/scales/${scale.key}/${scale.mode}`}>
              {scale.name}
            </Link>
          ),
      )}
    </>
  );
}

function MelodicScales() {
  return (
    <>
      {scales.map(
        (scale: Scale) =>
          scale.mode == "melodic" && (
            <Link href={`/scales/${scale.key}/${scale.mode}`}>
              {scale.name}
            </Link>
          ),
      )}
    </>
  );
}
