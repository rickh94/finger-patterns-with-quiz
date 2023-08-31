import scales, { type Scale } from "../scales";
import { useStore } from "@nanostores/preact";
import { scaleMenuOpen } from "../stores";

export default function ScalePicker() {
  const $scaleMenuOpen = useStore(scaleMenuOpen);

  return $scaleMenuOpen ? (
    <div class="fixed top-0 left-0 z-50 bg-fuchsia-200 bg-opacity-70 w-screen h-screen flex items-center justify-center">
      <div class="bg-white rounded p-4 w-72 shadow-lg text-black relative">
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
          {scales.map((scale: Scale) => (
            <a
              href={`/scales/${scale.key}/${scale.mode}`}
              className="underline text-fuchsia-800 hover:text-fuchsia-600"
            >
              {scale.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  ) : (
    ""
  );
}
