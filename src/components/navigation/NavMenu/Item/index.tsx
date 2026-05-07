import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";

interface NavMenuItemProps extends HTMLAttributes<HTMLLIElement> {}

export type NavMenuItemComponent = (props: NavMenuItemProps) => JSX.Element;

/** Navigation menu item */
const NavMenuItem: NavMenuItemComponent = (props: NavMenuItemProps) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <li
      {...attributes}
      class={clsx("nav-menu__item", class_attribute, className)}
    />
  );
};

export default NavMenuItem;
