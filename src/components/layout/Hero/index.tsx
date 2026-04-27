import "./styles.scss";

import { Location, Mail } from "maxcaplan-icons";
import Button from "@/components/input/Button";
import Seperator from "../Seperator";
import HeroHeading from "./Heading";

interface HeroProps {
  id?: string;
}

/** Landing page hero section */
export default function Hero(props: HeroProps) {
  return (
    <section
      aria-labelledby="hero__label"
      id={props.id}
      class="hero root-padding"
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

          <div class="hero__social-links">
            <Button
              href="https://github.com/maxcaplan/"
              target="_blank"
              icon="github"
              variant="icon"
              colour="outline"
            >
              <span class="visually-hidden">Max Caplan Github</span>
            </Button>

            <Button
              href="https://www.linkedin.com/in/max-caplan/"
              target="_blank"
              icon="linkedin"
              variant="icon"
              colour="outline"
            >
              <span class="visually-hidden">Max Caplan Linkedin</span>
            </Button>

            <Button
              href="https://mastodon.social/@maxcaplan"
              target="_blank"
              icon="mastodon"
              variant="icon"
              colour="outline"
            >
              <span class="visually-hidden">Max Caplan Mastodon</span>
            </Button>
          </div>

          <div class="hero__call-to-action">
            <p>
              My name is max, I am a software developer obsessed with human
              oriented technology. I make ethical, empowering and straight up
              cool things
            </p>

            <div class="hero__call-to-action-footer">
              <Button colour="primary" icon="mail" variant="icon-right">
                Get in touch
              </Button>

              <Button variant="icon-right" icon="arrow-right">
                Read my blog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
