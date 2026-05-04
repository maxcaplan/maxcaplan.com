import "./styles.scss";

import clsx from "clsx";
import type { JSX, Signalish } from "preact";
import { useMemo } from "preact/hooks";
import Button from "@/components/input/Button";
import type { ProjectEntry } from "@/types";
import { formatDate } from "@/util/client/format";
import SkillBadge from "../../Badge/Skill";
import Card, { type CardProps } from "../../Card";
import Carousel from "../../Carousel";
import type { CarouselSlideItemProps } from "../../Carousel/SlideItem";
import Image from "../../Image";

interface ProjectCardBaseProps {
  project: ProjectEntry;
  loading?: "lazy" | "eager";
}

export type ProjectCardProps = ProjectCardBaseProps &
  Omit<CardProps, "children">;
export type ProjectCardSlideItemProps = ProjectCardBaseProps &
  Omit<CarouselSlideItemProps, "children">;

export interface ProjectCardComponent {
  (props: ProjectCardProps): JSX.Element;
  /** Render project card as a carousel slide item */
  SlideItem: (props: ProjectCardSlideItemProps) => JSX.Element;
}

const componentClass = (
  class_attribute?: Signalish<string | undefined>,
  className?: Signalish<string | undefined>,
  is_slide_item?: boolean,
) =>
  clsx(
    is_slide_item && "card",
    "project-card",
    is_slide_item && "project-card--slide-item",
    class_attribute,
    className,
  );

/** Project card internal inner content component */
const ProjectCardInner = (props: ProjectCardBaseProps) => {
  const { project, loading } = props;

  /** Cover image attributes */
  const cover_attributes = useMemo(
    () =>
      project.data.cover instanceof Object
        ? project.data.cover
        : { src: project.data.cover },
    [project.data.cover],
  );

  /** Date object */
  const date = useMemo(
    () =>
      project.data.date instanceof Date
        ? project.data.date
        : new Date(project.data.date),
    [project.data.date],
  );

  return (
    <>
      <div class="project-card__cover">
        <Image
          {...cover_attributes}
          sources={[
            { format: "webp", src_suffix: "_lg", media: "(min-width: 640px)" },
            { format: "webp", src_suffix: "_md", media: "(min-width: 480px)" },
            { format: "webp", src_suffix: "_sm" },
          ]}
          placeholder-url={project.placeholders?.cover}
          alt={project.data["cover-alt"] ?? ""}
          loading={loading ?? "lazy"}
        />
      </div>

      <div class="project-card__content">
        <Card.Header class="project-card__header">
          <h3 id={project.id} class="project-card__title">
            {project.data.title}
          </h3>

          <time
            class="project-card__date subtitle-2"
            datetime={date.toISOString()}
          >
            {formatDate(date, {
              month: { digits: 2 },
              year: true,
              seperator: "/",
            })}
          </time>
        </Card.Header>

        <ul class="project-card__skills">
          {project.data.skills?.map((skill) => (
            <li>
              <SkillBadge skill={skill} />
            </li>
          ))}
        </ul>

        <Card.Body class="project-card__body">
          <p>{project.data.description}</p>
        </Card.Body>

        <Card.Footer class="project-card__footer">
          <Button
            class="project-card__more-link"
            icon="arrow-right"
            variant="icon-right"
            href={`/projects/${project.id}`}
          >
            See more
            <span class="visually-hidden"> about {project.data.title}</span>
          </Button>
        </Card.Footer>
      </div>
    </>
  );
};

/** Display a preview of a project in a card */
const ProjectCard: ProjectCardComponent = (props) => {
  const {
    project,
    class: class_attribute,
    className,
    loading,
    ...card_props
  } = props;

  return (
    <Card
      {...card_props}
      class={componentClass(class_attribute, className)}
      aria-labelledby={project.id}
    >
      <ProjectCardInner project={project} loading={loading} />
    </Card>
  );
};

ProjectCard.SlideItem = (props) => {
  const {
    project,
    class: class_attribute,
    className,
    loading,
    ...slide_props
  } = props;

  return (
    <Carousel.SlideItem
      {...slide_props}
      class={componentClass(class_attribute, className, true)}
      aria-labelledby={project.id}
    >
      <ProjectCardInner project={project} loading={loading} />
    </Carousel.SlideItem>
  );
};

export default ProjectCard;
