import "./styles.scss";

import clsx from "clsx";
import { Location, Mail } from "maxcaplan-icons";
import type { HTMLAttributes } from "preact";
import ButtonGroup from "@/components/input/ButtonGroup";
import Seperator from "@/components/layout/Seperator";
import SocialLinkButton from "@/components/navigation/SocialLinkButton";
import SocialLinks from "@/components/navigation/SocialLinks";
import HeroHeading from "./Heading";

interface HeroProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "aria-label" | "aria-labelledby"
> {}

/** Landing page hero section */
export default function Hero(props: HeroProps) {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <section
      {...attributes}
      aria-labelledby="hero__label"
      class={clsx("hero root-padding", class_attribute, className)}
    >
      <h1 id="hero__label" class="visually-hidden">
        Developer and Designer
      </h1>

      <div class="hero__container container-full">
        <HeroHeading class="hero__heading" />

        <div class="hero__body">
          <div class="hero__details-wrapper">
            <p class="hero__detail">
              Halifax/Nova Scotia <Location width={20} height={20} />
            </p>

            <p class="hero__detail">
              contact@maxcaplan.com <Mail width={20} height={20} />
            </p>
          </div>

          <Seperator style="dashed" />

          <SocialLinks class="hero__social-links">
            {(social_media) => (
              <SocialLinkButton social-media={social_media} colour="outline" />
            )}
          </SocialLinks>

          <div class="hero__call-to-action">
            <p>
              My name is max, I am a software developer obsessed with human
              oriented technology. I make ethical, empowering and straight up
              cool things
            </p>

            <ButtonGroup
              class="hero__call-to-action-footer"
              direction="column"
              wrap
            >
              <ButtonGroup.Item
                class="hero__call-to-action-button"
                colour="primary"
                icon="mail"
                variant="icon-right"
              >
                Get in touch
              </ButtonGroup.Item>

              <ButtonGroup.Item
                class="hero__call-to-action-button"
                variant="icon-right"
                icon="arrow-right"
              >
                Read my blog
              </ButtonGroup.Item>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
