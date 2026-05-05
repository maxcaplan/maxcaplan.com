import "./styles.scss";

import type { HTMLAttributes } from "preact";
import { leadingZeros } from "@/util/client/format";
import Accordion from "../../Accordion";
import HomeHeader from "../Header";

export interface HomeServicesSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "aria-label" | "aria-labelledby"
> {
  "section-index"?: number;
}

export default function HomeServicesSection(props: HomeServicesSectionProps) {
  const { "section-index": section_index, ...attributes } = props;

  return (
    <section
      {...attributes}
      class="services-section"
      aria-labelledby="services"
    >
      <HomeHeader class="services-section__header">
        <HomeHeader.Title id="services" class="services-section__title">
          <span aria-hidden>{leadingZeros(section_index ?? 3, 2)}</span>
          <span>Services</span>
        </HomeHeader.Title>

        <HomeHeader.Subtitle class="services-section__subtitle">
          You have a goal, and i have a keyboard
        </HomeHeader.Subtitle>
      </HomeHeader>

      <div class="services-section__body">
        <Accordion
          id="seo-accordion"
          class="services-section__accordion"
          start-expanded
        >
          <Accordion.Header>
            <Accordion.Trigger icon="caret-down">SEO</Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel>
            <p>
              I conduct comprehensive audits of your website that give insights
              into the key metrics that impact how you reach your target
              audiences. I breakdown progressive enhancements that can be made
              to your website so that you can make an informed choice on the
              course of action that best fits your goals and budget
            </p>
          </Accordion.Panel>
        </Accordion>

        <Accordion id="uiux-accordion" class="services-section__accordion">
          <Accordion.Header>
            <Accordion.Trigger icon="caret-down">
              UI/UX Design
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel>
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

        <Accordion id="wordpress-accordion" class="services-section__accordion">
          <Accordion.Header>
            <Accordion.Trigger icon="caret-down">
              WordPress Development
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel>
            <p>
              I use my purpose built in house toolkit as well as trusted
              community tools to provide bespoke Wordpress theme and plugin
              development. My workflow is designed to achieve your projects
              goals while providing you with a final product that is robust,
              maintainable, and easy to use for non-developers
            </p>
          </Accordion.Panel>
        </Accordion>

        <Accordion id="fullstack-accordion" class="services-section__accordion">
          <Accordion.Header>
            <Accordion.Trigger icon="caret-down">
              Fullstack Development
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Panel>
            <p>
              From custom user interfaces to website servers, I provide high
              quality software development aligned with industry standards. I
              ensure industry standards for code quality and best practices
              while developing robust and maintainable software
            </p>
          </Accordion.Panel>
        </Accordion>
      </div>
    </section>
  );
}
