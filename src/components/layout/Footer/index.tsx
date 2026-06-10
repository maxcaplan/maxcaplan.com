import Logo from "@/components/brand/Logo";
import "./styles.scss";

import clsx from "clsx";
import { Frowny, Iffy, Shocky, Smiley } from "maxcaplan-icons";
import type { HTMLAttributes } from "preact";
import Button from "@/components/input/Button";
import NavMenu from "@/components/navigation/NavMenu";
import SocialLinkButton from "@/components/navigation/SocialLinkButton";
import SocialLinks from "@/components/navigation/SocialLinks";
import Seperator from "../Seperator";

export interface FooterProps extends HTMLAttributes<HTMLElement> {}

/** Global page footer */
export default function Footer(props: FooterProps) {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <footer
      {...attributes}
      class={clsx("footer root-padding", class_attribute, className)}
    >
      <div class="footer__inner container--full">
        <div class="footer__brand">
          <a href="/" class="footer__homepage-link">
            <span class="visually-hidden">Go to the homepage</span>
            <Logo class="footer__logo" variant="logo" aria-hidden="true" />
            <Logo
              class="footer__logo"
              variant="lettermark"
              aria-hidden="true"
            />
          </a>
        </div>

        <Button
          href="#"
          class="footer__top-button"
          icon="arrow-big-up"
          variant="icon-right"
          colour="outline"
        >
          To top
        </Button>

        <NavMenu class="footer__nav-menu" aria-label="Menu">
          <NavMenu.Item class="footer__nav-menu-item--top-level">
            <NavMenu.Link href="/" class="footer__nav-menu-link--top-level">
              Portfolio
            </NavMenu.Link>

            <ul class="footer__nav-menu-sub-list">
              <NavMenu.Item>
                <NavMenu.Link href="/#work">Work</NavMenu.Link>
              </NavMenu.Item>

              <NavMenu.Item>
                <NavMenu.Link href="/#projects">Projects</NavMenu.Link>
              </NavMenu.Item>

              <NavMenu.Item>
                <NavMenu.Link href="/#services">Services</NavMenu.Link>
              </NavMenu.Item>

              <NavMenu.Item>
                <NavMenu.Link href="/#contact">Contact</NavMenu.Link>
              </NavMenu.Item>
            </ul>
          </NavMenu.Item>

          <NavMenu.Item class="footer__nav-menu-item--top-level">
            <NavMenu.Link href="/blog" class="footer__nav-menu-link--top-level">
              Blog
            </NavMenu.Link>

            <ul class="footer__nav-menu-sub-list">
              <NavMenu.Item>
                <NavMenu.Link href="/blog/categories">Categories</NavMenu.Link>
              </NavMenu.Item>

              <NavMenu.Item>
                <NavMenu.Link href="/blog/tags">Tags</NavMenu.Link>
              </NavMenu.Item>
            </ul>
          </NavMenu.Item>

          <NavMenu.Item class="footer__nav-menu-item--top-level">
            <NavMenu.Link
              href="/about"
              class="footer__nav-menu-link--top-level"
            >
              About
            </NavMenu.Link>

            <ul class="footer__nav-menu-sub-list">
              <NavMenu.Item>
                <NavMenu.Link href="/resume">Resume</NavMenu.Link>
              </NavMenu.Item>

              <NavMenu.Item>
                <NavMenu.Link href="/design">Design</NavMenu.Link>
              </NavMenu.Item>
            </ul>
          </NavMenu.Item>

          <NavMenu.Item class="footer__nav-menu-item--top-level">
            <NavMenu.Link
              href="/sitemap"
              class="footer__nav-menu-link--top-level"
            >
              Sitemap
            </NavMenu.Link>

            <ul class="footer__nav-menu-sub-list">
              <NavMenu.Item>
                <NavMenu.Link href="/privacy-policy">
                  Privacy policy
                </NavMenu.Link>
              </NavMenu.Item>

              <NavMenu.Item>
                <NavMenu.Link
                  href="http://github.com/maxcaplan/maxcaplan.com"
                  target="_blank"
                >
                  Source code
                </NavMenu.Link>
              </NavMenu.Item>
            </ul>
          </NavMenu.Item>
        </NavMenu>

        <SocialLinks class="footer__social-links">
          {(item) => <SocialLinkButton social-media={item} colour="outline" />}
        </SocialLinks>

        <div class="footer__faces">
          <Smiley />
          <Frowny />
          <Shocky />
          <Iffy />
        </div>

        <p class="footer__copy ui-sm">Copyleft 🄯2026 Max Caplan</p>
      </div>
    </footer>
  );
}
