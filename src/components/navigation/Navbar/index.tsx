import "./styles.scss";

import clsx from "clsx";
import { Menu, Settings } from "maxcaplan-icons";
import type { ComponentChildren } from "preact";
import lettermarkDark from "@/assets/images/brand/lettermark_dark.svg";
import lettermarkLight from "@/assets/images/brand/lettermark_light.svg";
import logoDark from "@/assets/images/brand/logo_dark.svg";
import logoLight from "@/assets/images/brand/logo_light.svg";

interface NavItemProps {
  children?: ComponentChildren;
}

interface NavLinkProps {
  href: string;
  current?: boolean;
  children?: ComponentChildren;
}

const NavItem = (props: NavItemProps) => {
  return <li class="navbar__nav-item">{props.children}</li>;
};

const NavLink = (props: NavLinkProps) => {
  return (
    <a
      href={props.href}
      class={clsx(
        "navbar__nav-link",
        props.current && "navbar__nav-link--current",
      )}
      aria-current={props.current ? "page" : undefined}
    >
      {props.children}
    </a>
  );
};

export function Navbar() {
  return (
    <header class="navbar">
      <div class="navbar__inner">
        <div class="navbar__brand">
          <a
            href="/"
            aria-label="Go to the maxcaplan.com homepage"
            class="navbar__homepage-link"
          >
            <img
              src={logoDark.src}
              alt="Max Caplan"
              width={logoDark.width}
              height={logoDark.height}
              class="navbar__logo--dark"
            />

            <img
              src={logoLight.src}
              alt="Max Caplan"
              width={logoLight.width}
              height={logoLight.height}
              class="navbar__logo--light"
            />

            <img
              src={lettermarkDark.src}
              alt="Max Caplan"
              width={lettermarkDark.width}
              height={lettermarkDark.height}
              class="navbar__lettermark--dark"
            />

            <img
              src={lettermarkLight.src}
              alt="Max Caplan"
              width={lettermarkLight.width}
              height={lettermarkLight.height}
              class="navbar__lettermark--light"
            />
          </a>
        </div>

        <nav class="navbar__nav" aria-label="Primary">
          <ul class="navbar__nav-list">
            <NavItem>
              <NavLink href="#" current>
                Portfolio
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#">Blog</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </ul>
        </nav>

        <button
          class="navbar__settings-menu-button"
          aria-label="Website Settings Menu"
          aria-expanded="false"
        >
          <Settings width={26} height={26} />
        </button>

        <button
          class="navbar__menu-button"
          aria-label="Menu"
          aria-expanded="false"
        >
          <Menu width={26} height={26} />
        </button>
      </div>
    </header>
  );
}
