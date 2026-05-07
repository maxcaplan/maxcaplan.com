import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import type { HomeNavContentComponent } from "./Content";
import HomeNavContent from "./Content";
import type { HomeNavMenuComponent } from "./Menu";
import HomeNavMenu from "./Menu";

export interface HomeNavProps extends HTMLAttributes<HTMLDivElement> {}

export interface HomeNavComponent {
  (props: HomeNavProps): JSX.Element;
  Menu: HomeNavMenuComponent;
  Content: HomeNavContentComponent;
}

/** Home navigation layout wrapper */
const HomeNav: HomeNavComponent = (props) => {
  const { class: class_attribute, className, children, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("home-nav root-padding", class_attribute, className)}
    >
      <div class="home-nav__inner container-full">{children}</div>
    </div>
  );
};

HomeNav.Menu = HomeNavMenu;
HomeNav.Content = HomeNavContent;

export default HomeNav;
