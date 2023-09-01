type ListCheckBoxProps = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  text: string;
};

export default function ListCheckBox({
  isChecked,
  setIsChecked,
  text,
}: ListCheckBoxProps) {
  return (
    <label
      className={
        "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none" +
        (isChecked
          ? " border-fuchsia-700 ring-2 ring-fuchsia-700"
          : " border-gray-300")
      }
    >
      <input
        type="checkbox"
        name="strings"
        class="sr-only"
        aria-labelledby="project-type-0-label"
        aria-describedby="project-type-0-description-0 project-type-0-description-1"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.currentTarget.checked)}
      />
      <span class="flex flex-1">
        <span class="flex flex-col">
          <span
            id="project-type-0-label"
            class="block text-sm font-medium text-gray-900"
          >
            {text}
          </span>
        </span>
      </span>
      <svg
        className={"h-5 w-5 text-fuchsia-700" + (isChecked ? "" : " invisible")}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>
      <span
        className={
          "pointer-events-none absolute -inset-px rounded-lg border-2" +
            isChecked
            ? " border-fuchsia-700"
            : " border-gray-300"
        }
        aria-hidden="true"
      ></span>
    </label>
  );
}
