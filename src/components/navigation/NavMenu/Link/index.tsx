import clsx from "clsx";
import type { AnchorHTMLAttributes, JSX } from "preact";
import { useContext } from "preact/hooks";
import NavMenuContext from "../NavMenuContext";

export interface NavMenuLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "aria-current"
> {}

export type NavMenuLinkComponent = (props: NavMenuLinkProps) => JSX.Element;

/** Navigation menu link */
const NavMenuLink: NavMenuLinkComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  const context = useContext(NavMenuContext);

  const is_current =
    context?.current !== undefined && context.current === props.href;

  return (
    <a
      {...attributes}
      aria-current={is_current ? "page" : undefined}
      class={clsx(
        "nav-menu__link",
        is_current && "nav-menu__link--current",
        class_attribute,
        className,
      )}
    />
  );
};

export default NavMenuLink;
