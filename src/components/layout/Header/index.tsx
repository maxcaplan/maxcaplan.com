import "./styles.scss";

import { Menu, Settings } from "maxcaplan-icons";
import Logo from "@/components/brand/Logo";
import NavMenu from "@/components/navigation/NavMenu";

/** Global page header */
export default function Header() {
  return (
    <header class="header root-padding">
      <a href="#main-content" class="header__skip-link">
        Skip to content
      </a>

      <div class="header__inner">
        <div class="header__brand">
          <a
            href="/"
            aria-label="Go to the maxcaplan.com homepage"
            class="header__homepage-link"
          >
            <Logo className="header__logo" variant="logo" />
            <Logo className="header__logo" variant="lettermark" />
          </a>
        </div>

        <NavMenu label="Main" class="header__nav-menu" current="/">
          <NavMenu.Item>
            <NavMenu.Link href="/">Portfolio</NavMenu.Link>
          </NavMenu.Item>

          <NavMenu.Item>
            <NavMenu.Link href="/blog">Blog</NavMenu.Link>
          </NavMenu.Item>

          <NavMenu.Item>
            <NavMenu.Link href="/about">about</NavMenu.Link>
          </NavMenu.Item>
        </NavMenu>

        <button
          class="header__menu-button header__menu-button--settings"
          aria-label="Website Settings Menu"
          aria-expanded="false"
        >
          <Settings width={26} height={26} />
        </button>

        <button
          class="header__menu-button"
          aria-label="Menu"
          aria-expanded="false"
        >
          <Menu width={26} height={26} />
        </button>
      </div>
    </header>
  );
}
