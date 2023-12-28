import type { ComponentChildren } from "preact";
import { scaleMenuOpen } from "../stores";

export default function ScalesButton({
  children,
  autoFocus = false,
}: {
  children: ComponentChildren;
  autoFocus?: boolean;
}) {
  return (
    <button
      autoFocus={autoFocus}
      onClick={() => {
        scaleMenuOpen.set(true);
      }}
      className="m-0 inline rounded p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white "
    >
      {children}
    </button>
  );
}
