import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes } from "preact";

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

/** A container for navigation typically found at the top of the page */
export default function NavBar(props: NavBarProps) {
  const { class: class_attribute, className, children, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("navbar", "root-padding", class_attribute, className)}
    >
      <div class="navbar__inner container--full">{children}</div>
    </div>
  );
}
