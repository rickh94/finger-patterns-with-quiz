import type { ComponentChildren } from "preact";
import { scaleMenuOpen } from "../stores";

export default function ScalesButton({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <button
      onClick={() => {
        scaleMenuOpen.set(true);
      }}
      className="m-0 inline rounded p-0 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-offset-2 focus:ring-offset-white "
    >
      {children}
    </button>
  );
}
