import { CheckCircleIcon } from '@heroicons/react/20/solid';
type RadioBoxProps = {
  key: string;
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
  return (
    <label
      htmlFor={key}
      className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none${checked
          ? ' border-fuchsia-700 ring-2 ring-fuchsia-700'
          : ' border-gray-300'
        }`}
    >
      <input
        type="radio"
        name={name}
        id={key}
        value={value}
        class="sr-only"
        checked={checked}
        onChange={(e) => e.currentTarget.checked && setChecked()}
        aria-labelledby={`${key}-label`}
      />
      <span className="flex flex-1">
        <span className="flex-col">
          <span
            className="block text-sm font-medium text-gray-900"
            id={`${key}-label`}
          >
            {text}
          </span>
        </span>
      </span>
      <CheckCircleIcon
        className={`h-5 w-5 text-fuchsia-700${checked ? '' : ' invisible'}`}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute -inset-px rounded-lg border-2${checked ? ' border-fuchsia-700' : ' border-gray-300'
          }`}
        aria-hidden="true"
      />
    </label>
  );
}
