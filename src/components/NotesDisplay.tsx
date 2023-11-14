import { useStore } from "@nanostores/preact";
import { activeFinger } from "../stores";
import ABCJS, { type AbcElem } from "abcjs";
import { useEffect } from "preact/hooks";

type NotesDisplayProps = {
  baseId: string;
  notes: string;
  offset: number;
  disabled?: boolean;
  wrap?: {
    minSpacing: number;
    maxSpacing: number;
    preferredMeasuresPerLine: number;
  };
  staffwidth?: number;
  responsive?: "resize";
};

export default function NotesDisplay({
  baseId,
  notes,
  offset,
  wrap = undefined,
  staffwidth = undefined,
  responsive = undefined,
  disabled = false,
}: NotesDisplayProps) {
  const $activeFinger = useStore(activeFinger);
  const notesId = `${baseId}notes`;

  function onNoteClick(abcElem: AbcElem) {
    if (disabled) {
      return;
    }
    for (const el of abcElem.abselem.elemset) {
      if (!el.classList.contains("abcjs-note")) {
        return;
      }
      const regex = /abcjs-n(\d+)/;
      const match = regex.exec(el.className.baseVal);
      if (!match?.[1]) {
        return;
      }
      const noteIdx = parseInt(match[1], 10);

      let baseId = Math.floor((noteIdx + offset) / 4);
      let fingerNumber = (noteIdx + offset) % 4;
      if (fingerNumber === 0) {
        baseId--;
        fingerNumber = 4;
      } else if (fingerNumber > 4) {
        return;
      }
      activeFinger.set({ baseId: `${baseId}`, num: fingerNumber });
    }
  }

  useEffect(() => {
    ABCJS.renderAbc(notesId, notes, {
      scale: 1.1,
      add_classes: true,
      clickListener: onNoteClick,
      paddingleft: 0,
      paddingright: 0,
      paddingbottom: 0,
      paddingtop: 0,
      wrap,
      staffwidth,
      responsive,
    });
  }, [notes, wrap, staffwidth, responsive, notesId]);

  useEffect(() => {
    if (!$activeFinger.num || !$activeFinger.baseId) {
      return;
    }
    const baseId = parseInt($activeFinger.baseId, 10);
    const noteNumber = baseId * 4 + $activeFinger.num - offset;
    for (const el of document.querySelectorAll(
      `#${notesId} .abcjs-note_selected`,
    )) {
      el.classList.remove("abcjs-note_selected");
    }
    document
      .querySelector(`#${notesId} .abcjs-n${noteNumber}`)
      ?.classList.add("abcjs-note_selected");
  }, [$activeFinger]);

  return (
    <div className="notes -pl-2 h-[100px] overflow-x-scroll" id={notesId}></div>
  );
}
