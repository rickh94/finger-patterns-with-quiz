import { scaleMenuOpen } from '../stores';

export default function ScalesButton({ ...props }: any) {
  return (
    <button
      onClick={() => {
        scaleMenuOpen.set(true);
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
