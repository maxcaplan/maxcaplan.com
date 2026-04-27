import "./styles.scss";

import type { CollectionEntry } from "astro:content";
import clsx from "clsx";
import { useMemo } from "preact/hooks";
import SkillBadge from "@/components/display/Badge/Skill";
import Card from "@/components/display/Card";
import Image from "@/components/display/Image";
import Button from "@/components/input/Button";

interface CoverImageAttributes {
  src: string;
  width?: number | string;
  height?: number | string;
}

interface WorkCardProps {
  id: string;
  class?: string;
  title: string;
  date: string | Date;
  skills?: CollectionEntry<"skills">[];
  description: string;
  cover: string | CoverImageAttributes;
  "cover-placeholder"?: string;
  "cover-alt"?: string;
}

/** A preview of a portfolio work item */
export default function WorkCard(props: WorkCardProps) {
  /** Cover image attributes */
  const cover_attributes = useMemo<CoverImageAttributes>(() => {
    if (props.cover instanceof Object) {
      return props.cover;
    }

    return { src: props.cover };
  }, [props.cover]);

  /** Formatted date */
  const date = useMemo(() => {
    const date = props.date instanceof Date ? props.date : new Date(props.date);

    const year = date.getFullYear();
    const month = date.getMonth();

    return {
      iso: date.toISOString(),
      label: `${month >= 10 ? month : "0" + month}/${year}`,
    };
  }, [props.date]);

  return (
    <Card class={clsx("work-card", props.class)} aria-labelledby={props.id}>
      <div class="work-card__cover">
        <Image
          {...cover_attributes}
          sources={[
            { format: "webp", src_suffix: "_lg", media: "(min-width: 640px)" },
            { format: "webp", src_suffix: "_md", media: "(min-width: 480px)" },
            { format: "webp", src_suffix: "_sm" },
          ]}
          placeholder-url={props["cover-placeholder"]}
          loading={"lazy"}
        />
      </div>

      <div class="work-card__content">
        <Card.Header class="work-card__header">
          <h3 id={props.id} class="work-card__title">
            {props.title}
          </h3>

          <time class="work-card__date subtitle-2" datetime={date.iso}>
            {date.label}
          </time>
        </Card.Header>

        <ul class="work-card__skills">
          {props.skills?.map((skill) => (
            <li>
              <SkillBadge skill={skill} />
            </li>
          ))}
        </ul>

        <Card.Body class="work-card__body">
          <p>{props.description}</p>
        </Card.Body>

        <Card.Footer class="work-card__footer">
          <Button
            class="work-card__more-link"
            icon="arrow-right"
            variant="icon-right"
            href={`/work/${props.id}`}
          >
            See more <span class="visually-hidden">about {props.title}</span>
          </Button>
        </Card.Footer>
      </div>
    </Card>
  );
}
