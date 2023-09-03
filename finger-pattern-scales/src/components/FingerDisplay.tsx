import { useStore } from '@nanostores/preact';
import { activeFinger } from '../stores.ts';
import type { PatternWidth } from '../patterns';

type FingerDisplayProps = {
  baseId: string;
  radius: number;
  widths: [PatternWidth, PatternWidth, PatternWidth, PatternWidth];
  disabled?: boolean;
};

export default function FingerDisplay({
  baseId,
  radius,
  widths,
  disabled = false,
}: FingerDisplayProps) {
  const $activeFinger = useStore(activeFinger);

  const oneXPos = widths[0];
  const twoXPos = oneXPos + radius + widths[1];
  const threeXPos = twoXPos + radius + widths[2];
  const fourXPos = threeXPos + radius + widths[3];

  function isFingerActive(num: 1 | 2 | 3 | 4) {
    return $activeFinger.baseId === baseId && $activeFinger.num === num;
  }

  function setActiveFinger(num: 1 | 2 | 3 | 4) {
    if (disabled) {
      return;
    }
    activeFinger.set({ baseId, num });
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="100"
      viewBox="0 0 79.374999 26.458334"
      version="1.1"
      id={baseId + '-finger-pattern'}
    >
      <g transform="translate(0,-270.54165)">
        <path
          className="line stroke-default"
          d="M 0,283.59224 H 79.375"
          id={baseId + '-finger-pattern-line'}
        />
        <circle
          id={baseId + '-finger-1'}
          cx={oneXPos}
          cy="283.77081"
          r={radius}
          className={
            isFingerActive(1)
              ? 'finger-active stroke-default finger'
              : 'stroke-default finger'
          }
          onClick={setActiveFinger.bind(null, 1)}
        />
        <circle
          id={baseId + '-finger-2'}
          cx={twoXPos}
          cy="283.77081"
          r={radius}
          className={
            isFingerActive(2)
              ? 'finger-active stroke-default finger'
              : 'stroke-default finger'
          }
          onClick={setActiveFinger.bind(null, 2)}
        />
        <circle
          id={baseId + '-finger-3'}
          cx={threeXPos}
          cy="283.77081"
          r={radius}
          className={
            isFingerActive(3)
              ? 'finger-active stroke-default finger'
              : 'stroke-default finger'
          }
          onClick={setActiveFinger.bind(null, 3)}
        />
        <circle
          id={baseId + '-finger-4'}
          cx={fourXPos}
          cy="283.77081"
          r={radius}
          className={
            isFingerActive(4)
              ? 'finger-active stroke-default finger'
              : 'stroke-default finger'
          }
          onClick={setActiveFinger.bind(null, 4)}
        />
        <text
          className={
            isFingerActive(1)
              ? 'finger-active stroke-default svg-text number'
              : 'stroke-default svg-text number'
          }
          onClick={setActiveFinger.bind(null, 1)}
          x={oneXPos - 1.2}
          y="280.45789"
          id={baseId + '-finger-1-text'}
          transform="scale(0.9999799,1.0000201)"
        >
          <tspan x={oneXPos - 1.2} y="280.45789">
            1
          </tspan>
        </text>
        <text
          x={twoXPos - 1.3}
          className={
            isFingerActive(2)
              ? 'finger-active stroke-default svg-text number'
              : 'stroke-default svg-text number'
          }
          onClick={setActiveFinger.bind(null, 2)}
          y="280.45789"
          id={baseId + '-finger-2-text'}
          transform="scale(0.99997991,1.0000201)"
        >
          <tspan x={twoXPos - 1.3} y="280.45789">
            2
          </tspan>
        </text>
        <text
          className={
            isFingerActive(3)
              ? 'finger-active stroke-default svg-text number'
              : 'stroke-default svg-text number'
          }
          onClick={setActiveFinger.bind(null, 3)}
          x={threeXPos - 1.4}
          y="280.41202"
          id={baseId + '-finger-3-text'}
          transform="scale(0.99997991,1.0000201)"
        >
          <tspan x={threeXPos - 1.4} y="280.41202">
            3
          </tspan>
        </text>
        <text
          className={
            isFingerActive(4)
              ? 'finger-active stroke-default svg-text number'
              : 'stroke-default svg-text number'
          }
          onClick={setActiveFinger.bind(null, 4)}
          x={fourXPos - 1.5}
          y="280.45789"
          id={baseId + '-finger-4-text'}
          transform="scale(0.99997991,1.0000201)"
        >
          <tspan x={fourXPos - 1.5} y="280.45789">
            4
          </tspan>
        </text>
      </g>
    </svg>
  );
}
