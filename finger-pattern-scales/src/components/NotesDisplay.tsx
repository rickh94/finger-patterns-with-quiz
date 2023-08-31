import { useStore } from "@nanostores/preact";
import { activeFinger } from "../stores.ts";
import ABCJS, { type AbcElem } from "abcjs";
import { useEffect, useId } from "preact/hooks";

type NotesDisplayProps = {
  notes: string;
  offset: number;
};

export default function NotesDisplay({ notes, offset }: NotesDisplayProps) {
  const $activeFinger = useStore(activeFinger);
  const notesId = useId();

  function onNoteClick(abcElem: AbcElem) {
    for (let el of abcElem.abselem.elemset) {
      if (!el.classList.contains("abcjs-note")) {
        return;
      }
      const regex = /abcjs-n(\d+)/;
      const match = regex.exec(el.className.baseVal);
      if (!match) {
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
    });
  }, [notes]);

  useEffect(() => {
    console.log("active finger changed");
    if (!$activeFinger.num || !$activeFinger.baseId) {
      return;
    }
    const baseId = parseInt($activeFinger.baseId, 10);
    const noteNumber = baseId * 4 + $activeFinger.num - offset;
    document
      .querySelectorAll(`#${notesId} .abcjs-note_selected`)
      ?.forEach((el: any) => {
        el.classList.remove("abcjs-note_selected");
      });
    document
      .querySelector(`#${notesId} .abcjs-n${noteNumber}`)
      ?.classList.add("abcjs-note_selected");
  }, [$activeFinger]);

  return <div className="notes -pl-2" id={notesId}></div>;
}
