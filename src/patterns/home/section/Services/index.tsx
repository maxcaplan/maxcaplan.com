import "./styles.scss";

import type { HTMLAttributes } from "preact";
import Accordion from "@/components/display/Accordion";
import HomeSectionHeader from "../Header";
import { leadingZeros } from "@/util/client/format";

export interface HomeServicesSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "aria-label" | "aria-labelledby"
> {
  "section-index"?: number;
}

/** Home page section for featured services */
export default function HomeServicesSection(props: HomeServicesSectionProps) {
  const { "section-index": section_index, ...attributes } = props;

  return (
    <section
      {...attributes}
      class="home-services-section"
      aria-labelledby="services"
    >
      <HomeSectionHeader class="home-services-section__header">
        <HomeSectionHeader.Title
          id="services"
          class="home-services-section__title"
        >
          <span aria-hidden>{leadingZeros(section_index ?? 3, 2)}</span>
          <span>Services</span>
        </HomeSectionHeader.Title>

        <HomeSectionHeader.Subtitle class="home-services-section__subtitle">
          You have a goal, and i have a keyboard
        </HomeSectionHeader.Subtitle>
      </HomeSectionHeader>

      <div class="home-services-section__body">
        <Accordion
          id="seo-accordion"
          class="home-services-section__accordion"
          start-expanded
        >
          <Accordion.Header class="home-services-section__accordion-header">
            <Accordion.Trigger
              class="home-services-section__accordion-trigger"
              icon="caret-down"
            >
              SEO
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel class="home-services-section__accordion-panel">
            <p>
              I conduct comprehensive audits of your website that give insights
              into the key metrics that impact how you reach your target
              audiences. I breakdown progressive enhancements that can be made
              to your website so that you can make an informed choice on the
              course of action that best fits your goals and budget
            </p>
          </Accordion.Panel>
        </Accordion>

        <Accordion id="uiux-accordion" class="home-services-section__accordion">
          <Accordion.Header class="home-services-section__accordion-header">
            <Accordion.Trigger
              class="home-services-section__accordion-trigger"
              icon="caret-down"
            >
              UI/UX Design
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel class="home-services-section__accordion-panel">
            <p>
              I provide bespoke design services for new or existing products. I
              leverage fundamental design principles and accessibility driven
              design to achieve your projects goals while maintaining a strong
              design foundation. I provide a complete design workflow for
              transparency, or I can work with you to adapt my services to your
              existing workflows
            </p>
          </Accordion.Panel>
        </Accordion>

        <Accordion
          id="wordpress-accordion"
          class="home-services-section__accordion"
        >
          <Accordion.Header class="home-services-section__accordion-header">
            <Accordion.Trigger
              class="home-services-section__accordion-trigger"
              icon="caret-down"
            >
              WordPress Development
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel class="home-services-section__accordion-panel">
            <p>
              I use my purpose built in house toolkit as well as trusted
              community tools to provide bespoke Wordpress theme and plugin
              development. My workflow is designed to achieve your projects
              goals while providing you with a final product that is robust,
              maintainable, and easy to use for non-developers
            </p>
          </Accordion.Panel>
        </Accordion>

        <Accordion
          id="fullstack-accordion"
          class="home-services-section__accordion"
        >
          <Accordion.Header class="home-services-section__accordion-header">
            <Accordion.Trigger
              class="home-services-section__accordion-trigger"
              icon="caret-down"
            >
              Fullstack Development
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel class="home-services-section__accordion-panel">
            <p>
              From custom user interfaces to web servers, I provide high quality
              software development aligned with industry standards. All custom
              development follows best practices for quality and security
              ensuring robust and maintainable software
            </p>
          </Accordion.Panel>
        </Accordion>
      </div>
    </section>
  );
}
