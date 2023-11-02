import { CheckCircleIcon } from '@heroicons/react/20/solid';

type ListCheckBoxProps = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  text: string;
  key: string;
};

export default function ListCheckBox({
  isChecked,
  setIsChecked,
  text,
  key,
}: ListCheckBoxProps) {
  return (
    <label
      htmlFor={key}
      className={
        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none' +
        (isChecked
          ? ' border-fuchsia-700 ring-2 ring-fuchsia-700'
          : ' border-pink-100')
      }
    >
      <input
        id={key}
        type="checkbox"
        name="strings"
        class="sr-only"
        aria-labelledby={key + '-label'}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.currentTarget.checked)}
      />
      <span class="flex flex-1">
        <span class="flex flex-col">
          <span
            id={key + '-label'}
            className="block text-sm font-medium text-gray-900"
          >
            {text}
          </span>
        </span>
      </span>
      <CheckCircleIcon
        className={'h-5 w-5 text-fuchsia-700' + (isChecked ? '' : ' invisible')}
        aria-hidden="true"
      />
      <span
        className={
          'pointer-events-none absolute -inset-px rounded-lg border-2' +
          isChecked
            ? ' border-fuchsia-700'
            : ' border-pink-100'
        }
        aria-hidden="true"
      ></span>
    </label>
  );
}
