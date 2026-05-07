import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import type { NavMenuItemComponent } from "./Item";
import NavMenuItem from "./Item";
import type { NavMenuLinkComponent } from "./Link";
import NavMenuLink from "./Link";
import NavMenuContext from "./NavMenuContext";

export interface NavMenuProps extends HTMLAttributes<HTMLElement> {
  ordered?: boolean;
  current?: string;
  direction?: "row" | "column";
}

export interface NavMenuComponent {
  (props: NavMenuProps): JSX.Element;
  Item: NavMenuItemComponent;
  Link: NavMenuLinkComponent;
}

/** Navigation menu */
const NavMenu: NavMenuComponent = (props) => {
  const {
    class: class_attribute,
    className,
    children,
    ordered,
    current,
    direction,
    ...attributes
  } = props;

  return (
    <NavMenuContext.Provider value={{ current: current }}>
      <nav
        {...attributes}
        class={clsx(
          "nav-menu",
          direction === "column" && "nav-menu--column",
          class_attribute,
          className,
        )}
      >
        {ordered && <ol class="nav-menu__list">{children}</ol>}
        {!ordered && <ul class="nav-menu__list">{children}</ul>}
      </nav>
    </NavMenuContext.Provider>
  );
};

NavMenu.Item = NavMenuItem;
NavMenu.Link = NavMenuLink;

export default NavMenu;
