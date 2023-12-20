import { CheckCircleIcon } from "@heroicons/react/20/solid";
type RadioBoxProps = {
  key?: string;
  value: string | number;
  text: string;
  name: string;
  checked: boolean;
  setChecked: () => void;
};

export default function RadioBox({
  key,
  value,
  text,
  name,
  checked,
  setChecked,
}: RadioBoxProps) {
  const id = key ?? `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      className={`relative flex cursor-pointer items-center justify-center rounded-lg border bg-white p-3  shadow-sm focus:outline-none${
        checked
          ? " border-fuchsia-700 ring-2 ring-fuchsia-700"
          : " border-pink-100"
      }`}
    >
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        class="sr-only"
        checked={checked}
        onChange={(e) => e.currentTarget.checked && setChecked()}
        aria-labelledby={`${id}-label`}
      />
      <span className="flex flex-1">
        <span className="flex-col">
          <span
            className="block text-sm font-medium text-gray-900"
            id={`${id}-label`}
          >
            {text}
          </span>
        </span>
      </span>
      <CheckCircleIcon
        className={`-mr-1 h-5 w-5 text-fuchsia-700${
          checked ? "" : " invisible"
        }`}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute -inset-px rounded-lg border-2${
          checked ? " border-fuchsia-700" : " border-pink-100"
        }`}
        aria-hidden="true"
      />
    </label>
  );
}
