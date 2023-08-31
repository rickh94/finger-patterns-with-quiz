import scales, { type Scale } from "../scales";
import { useStore } from "@nanostores/preact";
import { scaleMenuOpen } from "../stores";
import { useState } from "preact/hooks";

export default function ScalePicker() {
  const $scaleMenuOpen = useStore(scaleMenuOpen);
  const [modeSelected, setModeSelected] = useState<
    "major" | "melodic" | "minor"
  >("major");

  return $scaleMenuOpen ? (
    <div class="fixed top-0 left-0 z-50 bg-fuchsia-200 bg-opacity-70 w-screen h-screen flex items-center justify-center">
      <div class="bg-white rounded p-4 w-92 shadow-lg text-black relative">
        <div
          class="absolute bottom-0 left-0 w-full z-40 rounded-br rounded-bl overflow-hidden"
          aria-hidden="true"
        ></div>
        <div class="flex justify-between items-center z-50 relative w-full">
          <div class="text-2xl font-bold">Scales</div>
          <button
            class="border-2 border-white rounded"
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
          class="grid grid-cols-2 gap-y-4 w-full mx-auto mt-4 z-50 relative text-center"
          aria-label="primary"
        >
          <div class="flex justify-center items-center col-span-2">
            <button
              className={
                modeSelected === "major"
                  ? "border-b-2 border-fuchsia-800 text-fuchsia-800 mr-4"
                  : "mr-4 border-b-2 border-transparent text-black"
              }
              onClick={() => setModeSelected("major")}
            >
              Major
            </button>{" "}
            |{" "}
            <button
              className={
                modeSelected === "melodic"
                  ? "border-b-2 border-fuchsia-800 text-fuchsia-800 mx-4"
                  : "mx-4 border-b-2 border-transparent text-black"
              }
              onClick={() => setModeSelected("melodic")}
            >
              Melodic Minor
            </button>
            |{" "}
            <button
              className={
                modeSelected === "minor"
                  ? "border-b-2 border-fuchsia-800 text-fuchsia-800 ml-4"
                  : "ml-4 border-b-2 border-transparent text-black"
              }
              onClick={() => setModeSelected("minor")}
            >
              Natural Minor
            </button>
          </div>
          {modeSelected === "major" && <MajorScales />}
          {modeSelected === "melodic" && <MelodicScales />}
          {modeSelected === "minor" && <MinorScales />}
        </nav>
      </div>
    </div>
  ) : (
    ""
  );
}

function MajorScales() {
  return (
    <>
      {scales.map(
        (scale: Scale) =>
          scale.mode == "major" && (
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="underline text-fuchsia-800 hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
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
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="underline text-fuchsia-800 hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
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
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="underline text-fuchsia-800 hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
          ),
      )}
    </>
  );
}
