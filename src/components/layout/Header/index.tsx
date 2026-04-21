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

      <div class="header__inner container-full">
        <div class="header__brand">
          <a href="/" class="header__homepage-link">
            <span class="visually-hidden">Go to the homepage</span>
            <Logo className="header__logo" variant="logo" aria-hidden="true" />
            <Logo
              className="header__logo"
              variant="lettermark"
              aria-hidden="true"
            />
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
          aria-expanded="false"
        >
          <span class="visually-hidden">Website settings menu</span>
          <Settings width={26} height={26} />
        </button>

        <button class="header__menu-button" aria-expanded="false">
          <span class="visually-hidden">Menu</span>
          <Menu width={26} height={26} />
        </button>
      </div>
    </header>
  );
}
