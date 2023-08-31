import { scaleMenuOpen } from "../stores";

export default function NavButton(props: any) {
  return (
    <button {...props} onClick={() => scaleMenuOpen.set(true)}>
      {props.children}
    </button>
  );
}
