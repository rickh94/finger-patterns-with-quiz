import { map, atom } from "nanostores";

export interface ActiveFingerValue {
  baseId: string | null;
  num: number | null;
}

export const activeFinger = map<ActiveFingerValue>({
  baseId: null,
  num: null,
});

export const scaleMenuOpen = atom(false);
