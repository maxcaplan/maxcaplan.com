import "./styles.scss";

import clsx from "clsx";
import { useMemo } from "preact/hooks";
import SkillBadge from "@/components/display/Badge/Skill";
import Card, { type CardProps } from "@/components/display/Card";
import Image from "@/components/display/Image";
import Button from "@/components/input/Button";
import type { WorkItemEntry } from "@/types";
import { formatDate } from "@/util/client/format";

interface WorkCardProps extends CardProps {
  work: WorkItemEntry;
  loading?: "lazy" | "eager";
}

/** A preview of a portfolio work item */
export default function WorkCard(props: WorkCardProps) {
  const {
    work,
    class: class_attribute,
    className,
    loading,
    ...card_props
  } = props;

  /** Cover image attributes */
  const cover_attributes = useMemo(
    () =>
      work.data.cover instanceof Object
        ? work.data.cover
        : { src: work.data.cover },
    [work.data.cover],
  );

  /** Date object */
  const date = useMemo(
    () =>
      work.data.date instanceof Date
        ? work.data.date
        : new Date(work.data.date),
    [work.data.date],
  );

  return (
    <Card
      {...card_props}
      class={clsx("work-card", class_attribute, className)}
      aria-labelledby={work.id}
    >
      <div class="work-card__cover">
        <Image
          {...cover_attributes}
          sources={[
            { format: "webp", src_suffix: "_lg", media: "(min-width: 640px)" },
            { format: "webp", src_suffix: "_md", media: "(min-width: 480px)" },
            { format: "webp", src_suffix: "_sm" },
          ]}
          placeholder-url={work.placeholders?.cover}
          alt={work.data["cover-alt"] ?? ""}
          loading={loading ?? "lazy"}
        />
      </div>

      <div class="work-card__content">
        <Card.Header class="work-card__header">
          <h3 id={work.id} class="work-card__title">
            {work.data.title}
          </h3>

          <time
            class="work-card__date subtitle-2"
            datetime={date.toISOString()}
          >
            {formatDate(date, {
              month: { digits: 2 },
              year: true,
              seperator: "/",
            })}
          </time>
        </Card.Header>

        <ul class="work-card__skills">
          {work.data.skills?.map((skill) => (
            <li>
              <SkillBadge skill={skill} />
            </li>
          ))}
        </ul>

        <Card.Body class="work-card__body">
          <p>{work.data.description}</p>
        </Card.Body>

        <Card.Footer class="work-card__footer">
          <Button
            class="work-card__more-link"
            icon="arrow-right"
            variant="icon-right"
            href={`/work/${work.id}`}
          >
            See more
            <span class="visually-hidden"> about {work.data.title}</span>
          </Button>
        </Card.Footer>
      </div>
    </Card>
  );
}
