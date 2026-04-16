import clsx from "clsx";
import type { ComponentChildren, JSX } from "preact";

interface NavMenuItemProps {
  class?: string;
  children?: ComponentChildren;
}

export type NavMenuItemComponent = (props: NavMenuItemProps) => JSX.Element;

/** Navigation menu item */
const NavMenuItem: NavMenuItemComponent = (props: NavMenuItemProps) => {
  return <li class={clsx("nav-menu__item", props.class)}>{props.children}</li>;
};

export default NavMenuItem;
