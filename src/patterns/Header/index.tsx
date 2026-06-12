import "./styles.scss";

import clsx from "clsx";
import { Menu as MenuIcon, Settings } from "maxcaplan-icons";
import type { HTMLAttributes } from "preact";
import Logo from "@/components/brand/Logo";
import NavMenu from "@/components/navigation/NavMenu";
import Menu from "@/components/input/Menu";

export interface HeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {}

/** Global page header */
export default function Header(props: HeaderProps) {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <header
      {...attributes}
      class={clsx("header root-padding", class_attribute, className)}
    >
      <a href="#main-content" class="header__skip-link">
        Skip to content
      </a>

      <div class="header__inner container--full">
        <div class="header__brand">
          <a href="/" class="header__homepage-link">
            <span class="visually-hidden">Go to the homepage</span>
            <Logo class="header__logo" variant="logo" aria-hidden="true" />
            <Logo
              class="header__logo"
              variant="lettermark"
              aria-hidden="true"
            />
          </a>
        </div>

        <NavMenu aria-label="Main" class="header__nav-menu" current="/">
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

        <Menu class="header__menu header__menu--settings">
          <Menu.Trigger>
            <span class="visually-hidden">Website settings menu</span>
            <Settings width={26} height={26} />
          </Menu.Trigger>

          <Menu.Items>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Menu.Items>
        </Menu>

        <Menu class="header__menu">
          <Menu.Trigger>
            <span class="visually-hidden">Menu</span>
            <MenuIcon width={26} height={26} />
          </Menu.Trigger>

          <Menu.Items>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
