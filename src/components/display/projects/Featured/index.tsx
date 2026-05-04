import "./styles.scss";

import clsx from "clsx";
import { useMemo } from "preact/hooks";
import Carousel, { type CarouselProps } from "@/components/display/Carousel";
import ProjectCard from "@/components/display/projects/Card";
import type { ProjectEntry } from "@/types";
import HomeHeader from "../../home/Header";

interface FeaturedProjectsCarouselProps extends CarouselProps {
  projects: ProjectEntry[];
}

/** Display a carousel of project cards */
export default function FeaturedProjectsCarousel(
  props: FeaturedProjectsCarouselProps,
) {
  const {
    projects,
    class: class_attribute,
    className,
    children,
    ...carousel_props
  } = props;

  const featured_projects = useMemo(
    () => projects.slice(0, 3),
    [props.projects],
  );

  return (
    <Carousel
      {...carousel_props}
      class={clsx("featured-projects", class_attribute, className)}
    >
      {children}

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
