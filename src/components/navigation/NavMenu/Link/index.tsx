import clsx from "clsx";
import type { ComponentChildren, JSX } from "preact";
import { useContext } from "preact/hooks";
import NavMenuContext from "../NavMenuContext";

interface NavMenuLinkProps {
  href: string;
  class?: string;
  label?: string;
  children?: ComponentChildren;
}

export type NavMenuLinkComponent = (props: NavMenuLinkProps) => JSX.Element;

/** Navigation menu link */
const NavMenuLink: NavMenuLinkComponent = (props) => {
  const context = useContext(NavMenuContext);

  const is_current =
    context?.current !== undefined && context.current === props.href;

  return (
    <a
      href={props.href}
      aria-label={props.label}
      aria-current={is_current ? "page" : undefined}
      class={clsx(
        "nav-menu__link",
        is_current && "nav-menu__link--current",
        props.class,
      )}
    >
      {props.children}
    </a>
  );
};

export default NavMenuLink;
