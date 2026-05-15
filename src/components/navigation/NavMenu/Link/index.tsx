import clsx from "clsx";
import type { AnchorHTMLAttributes, JSX } from "preact";
import { useContext, useMemo } from "preact/hooks";
import NavMenuContext from "../NavMenuContext";

export interface NavMenuLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "aria-current"
> {
  current?: boolean;
  "current-value"?: "page" | true;
}

export type NavMenuLinkComponent = (props: NavMenuLinkProps) => JSX.Element;

/** Navigation menu link */
const NavMenuLink: NavMenuLinkComponent = (props) => {
  const {
    class: class_attribute,
    className,
    current,
    "current-value": current_value,
    ...attributes
  } = props;

  const context = useContext(NavMenuContext);

  const is_current = useMemo(
    () =>
      context?.current === undefined
        ? !!current
        : context.current === props.href,
    [props.href, context?.current],
  );

  return (
    <a
      {...attributes}
      aria-current={is_current ? (current_value ?? "page") : undefined}
      class={clsx(
        "nav-menu__link",
        is_current && "nav-menu__link--current",
        class_attribute,
        className,
      )}
      data-current={is_current ? true : undefined}
    />
  );
};

export default NavMenuLink;
