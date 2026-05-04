import "./styles.scss";

import { useMemo } from "preact/hooks";
import type { ProjectEntry } from "@/types";
import Carousel from "../../Carousel";
import ProjectCard from "../Card";

interface FeaturedProjectsCarouselProps {
  entries: ProjectEntry[];
  "title-index"?: number;
}

export default function FeaturedProjectsCarousel(
  props: FeaturedProjectsCarouselProps,
) {
  const title_index = useMemo(() => {
    if (props["title-index"] === undefined) {
      return "02";
    }

    const index = Math.abs(props["title-index"]);
    return index >= 10 ? index : "0" + index;
  }, [props["title-index"]]);

  const featured_projects = useMemo(
    () => props.entries.slice(0, 3),
    [props.entries],
  );

  return (
    <Carousel class="featured-projects" aria-labelledby="projects">
      <div class="featured-projects__header">
        <h2 id="projects" class="featured-projects__title display-2">
          <span>Projects</span>{" "}
          {title_index && <span aria-hidden>{title_index}</span>}
        </h2>

        <p class="featured-projects__subtitle subtitle-1">
          Sometimes my side projects actually get finished ... or good enough to
          share
        </p>
      </div>

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
                <span class="featured-projects__carousel-indicator ui-md">
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
