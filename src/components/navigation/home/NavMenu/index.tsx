import "./styles.scss";

import type { ComponentChildren, JSX } from "preact";
import NavMenu from "@/components/navigation/NavMenu";

interface HomeNavMenuWrapperProps {
  children?: ComponentChildren;
}

interface HomeNavMenuContentProps {
  children?: ComponentChildren;
}

type HomeNavMenuWrapperComponent = (
  props: HomeNavMenuWrapperProps,
) => JSX.Element;
type HomeNavMenuContentComponent = (
  props: HomeNavMenuContentProps,
) => JSX.Element;

interface HomeNavMenuComponent {
  (): JSX.Element;
  Wrapper: HomeNavMenuWrapperComponent;
  Content: HomeNavMenuContentComponent;
}

/** Home page navigation menu */
const HomeNavMenu: HomeNavMenuComponent = () => {
  return (
    <NavMenu
      class="home-nav__menu"
      label="Table of Contents"
      ordered
      direction="column"
      current="#work"
    >
      <NavMenu.Item>
        <NavMenu.Link href="#work">Work</NavMenu.Link>
      </NavMenu.Item>

      <NavMenu.Item>
        <NavMenu.Link href="#projects">Projects</NavMenu.Link>
      </NavMenu.Item>

      <NavMenu.Item>
        <NavMenu.Link href="#services">Services</NavMenu.Link>
      </NavMenu.Item>

      <NavMenu.Item>
        <NavMenu.Link href="#contact">Contact</NavMenu.Link>
      </NavMenu.Item>
    </NavMenu>
  );
};

/** Wrapper component for home navigation menu layout */
export const Wrapper: HomeNavMenuWrapperComponent = (props) => {
  return (
    <div class="home-nav root-padding">
      <div class="home-nav__inner container-full">{props.children}</div>
    </div>
  );
};

/** Content wrapper component for home navigation menu layout */
export const Content: HomeNavMenuContentComponent = (props) => {
  return <div class="home-nav__content">{props.children}</div>;
};

HomeNavMenu.Wrapper = Wrapper;
HomeNavMenu.Content = Content;

export default HomeNavMenu;
