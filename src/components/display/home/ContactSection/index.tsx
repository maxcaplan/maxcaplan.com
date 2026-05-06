import "./styles.scss";

import { Location, Mail } from "maxcaplan-icons";
import type { HTMLAttributes } from "preact";
import HomeHeader from "@/components/display/home/Header";
import SocialLinkButton from "@/components/navigation/SocialLinkButton";
import SocialLinks from "@/components/navigation/SocialLinks";
import { leadingZeros } from "@/util/client/format";

export interface HomeContactSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "aria-label" | "aria-labelledby"
> {
  "section-index"?: number;
}

export default function HomeContactSection(props: HomeContactSectionProps) {
  const { "section-index": section_index, ...attributes } = props;

  return (
    <section
      {...attributes}
      class="contact-section root-padding"
      aria-labelledby="contact"
    >
      <div class="contact-section__inner container">
        <HomeHeader class="contact-section__header">
          <HomeHeader.Title id="contact" class="contact-section__title">
            <span aria-hidden>{leadingZeros(section_index ?? 4, 2)}</span>{" "}
            <span>Contact</span>
          </HomeHeader.Title>

          <HomeHeader.Subtitle class="contact-section__subtitle">
            Got a cool project? interested in working together? Want pictures of
            my cats? reach out!
          </HomeHeader.Subtitle>
        </HomeHeader>

        <div class="contact-section__body">
          <div class="contact-section__details">
            <div class="contact-section__detail-item">
              <span class="contact-section__detail-label eyebrow">
                <Location width={20} height={20} /> Location
              </span>

              <p class="heading-3">Halifax, Nova Scotia</p>
            </div>

            <div class="contact-section__detail-item">
              <span class="contact-section__detail-label eyebrow">
                <Mail width={20} height={20} /> Email
              </span>

              <p class="heading-3">
                <a href="mailto:contact@maxcaplan.com">
                  contact@maxacaplan.com
                </a>
              </p>
            </div>
          </div>

          <SocialLinks class="contact-section__social-links" direction="column">
            {(social_media) => (
              <SocialLinkButton
                class="contact-section__social-link-item"
                social-media={social_media}
                variant="icon-left"
                colour="outline"
                size="lg"
              />
            )}
          </SocialLinks>
        </div>
      </div>
    </section>
  );
}
