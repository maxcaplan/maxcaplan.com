import "./styles.scss";

import clsx from "clsx";
import { useMemo } from "preact/hooks";
import Carousel, { type CarouselProps } from "@/components/display/Carousel";
import HomeHeader from "@/components/display/home/Header";
import ProjectCard from "@/components/display/projects/Card";
import type { ProjectEntry } from "@/types";
import { leadingZeros } from "@/util/client/format";

interface HomeProjectsSectionProps extends Omit<
  CarouselProps,
  "children" | "aria-label" | "aria-labelledby"
> {
  projects: ProjectEntry[];
  "section-index"?: number;
}

/** Display a carousel of project cards */
export default function HomeProjectsSection(props: HomeProjectsSectionProps) {
  const {
    projects,
    class: class_attribute,
    className,
    "section-index": section_index,
    ...carousel_props
  } = props;

  const featured_projects = useMemo(
    () => projects.slice(0, 3),
    [props.projects],
  );

  return (
    <Carousel
      {...carousel_props}
      aria-labelledby="projects"
      class={clsx("featured-projects", class_attribute, className)}
    >
      <HomeHeader>
        <HomeHeader.Title id="projects">
          <span>Projects</span>
          <span aria-hidden>{leadingZeros(section_index ?? 2, 2)}</span>
        </HomeHeader.Title>

        <HomeHeader.Subtitle>
          Sometimes my side projects actually get finished ... or good enough to
          share
        </HomeHeader.Subtitle>
      </HomeHeader>

      <div class="featured-projects__carousel-controls-wrapper">
        <Carousel.Controls
          class="featured-projects__carousel-controls"
          aria-label="Featured Projects carousel controls"
        >
          <Carousel.ControlItem class="featured-projects__carousel-control-item">
            <Carousel.ControlButton
              class="featured-projects__carousel-control-button"
              direction="previous"
              icon="arrow-left"
              variant="icon"
              colour="ghost"
            >
              <span class="visually-hidden">Previous item</span>
            </Carousel.ControlButton>
          </Carousel.ControlItem>

          <Carousel.ControlItem class="featured-projects__carousel-control-item">
            <Carousel.Indicator>
              {({ index, slides }) => (
                <span
                  class="featured-projects__carousel-indicator ui-md"
                  aria-hidden
                >
                  {slides === 0 ? 0 : index + 1}/{slides}
                </span>
              )}
            </Carousel.Indicator>
          </Carousel.ControlItem>

          <Carousel.ControlItem class="featured-projects__carousel-control-item">
            <Carousel.ControlButton
              class="featured-projects__carousel-control-button"
              direction="next"
              icon="arrow-right"
              variant="icon"
              colour="ghost"
            >
              <span class="visually-hidden">Next item</span>
            </Carousel.ControlButton>
          </Carousel.ControlItem>
        </Carousel.Controls>
      </div>

      <Carousel.Slides class="featured-projects__carousel-slides">
        {featured_projects.map((entry) => (
          <ProjectCard.SlideItem
            key={entry.id}
            class="featured-projects__slide-item"
            project={entry}
          />
        ))}
      </Carousel.Slides>
    </Carousel>
  );
}
