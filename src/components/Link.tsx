import type { ComponentChildren } from "preact";

export default function Link({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: ComponentChildren;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white  ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      <span className="border-b-2 border-fuchsia-600 hover:text-fuchsia-800">
        {children}
      </span>
    </a>
  );
}
