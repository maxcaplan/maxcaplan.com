import "./styles.scss";

import clsx from "clsx";
import { type ComponentChildren, type JSX } from "preact";
import type { NavMenuItemComponent } from "./Item";
import NavMenuItem from "./Item";
import type { NavMenuLinkComponent } from "./Link";
import NavMenuLink from "./Link";
import NavMenuContext from "./NavMenuContext";

interface NavMenuProps {
  label: string;
  current?: string;
  direction?: "row" | "col";
  class?: string;
  children?: ComponentChildren;
}

interface NavMenuComponent {
  (props: NavMenuProps): JSX.Element;
  Item: NavMenuItemComponent;
  Link: NavMenuLinkComponent;
}

/** Navigation menu */
const NavMenu: NavMenuComponent = (props) => {
  return (
    <NavMenuContext.Provider value={{ current: props.current }}>
      <nav
        aria-label={props.label}
        class={clsx("nav-menu", props.class)}
        data-direction={props.direction || "row"}
      >
        <ul class="nav-menu__list">{props.children}</ul>
      </nav>
    </NavMenuContext.Provider>
  );
};

NavMenu.Item = NavMenuItem;
NavMenu.Link = NavMenuLink;

export default NavMenu;
