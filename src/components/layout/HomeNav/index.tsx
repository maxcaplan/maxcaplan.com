import "./styles.scss";

import type { ComponentChildren } from "preact";
import NavMenu from "@/components/navigation/NavMenu";

interface HomeNavProps {
  children?: ComponentChildren;
}

/** Home page navigation */
export default function HomeNav(props: HomeNavProps) {
  return (
    <div class="home-nav">
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

      <div class="home-nav__content">{props.children}</div>
    </div>
  );
}
