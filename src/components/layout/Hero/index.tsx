import "./styles.scss";

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Location,
  Mail,
  Mastodon,
} from "maxcaplan-icons";
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
              icon
              variant="outline"
            >
              <span class="visually-hidden">Max Caplan Github</span>
              <Github width={26} height={26} />
            </Button>

            <Button
              href="https://www.linkedin.com/in/max-caplan/"
              target="_blank"
              icon
              variant="outline"
            >
              <span class="visually-hidden">Max Caplan Linkedin</span>
              <Linkedin width={26} height={26} />
            </Button>

            <Button
              href="https://mastodon.social/@maxcaplan"
              target="_blank"
              icon
              variant="outline"
            >
              <span class="visually-hidden">Max Caplan Mastodon</span>
              <Mastodon width={26} height={26} />
            </Button>
          </div>

          <div class="hero__call-to-action">
            <p>
              My name is max, I am a software developer obsessed with human
              oriented technology. I make ethical, empowering and straight up
              cool things
            </p>

            <div class="hero__call-to-action-footer">
              <Button variant="primary">
                Get in touch <Mail width={26} height={26} />
              </Button>

              <Button>
                Read my blog <ArrowUpRight width={26} height={26} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
