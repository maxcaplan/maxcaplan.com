import "./styles.scss";

import clsx from "clsx";
import { useMemo } from "preact/hooks";
import SkillBadge from "@/components/display/Badge/Skill";
import Card, { type CardProps } from "@/components/display/Card";
import Image from "@/components/display/Image";
import Button from "@/components/input/Button";
import type {
  ImageSource,
  PortfolioItemCollectionKey,
  PortfolioItemEntry,
} from "@/types";
import { formatDate } from "@/util/client/format";

export interface PortfolioItemCardProps<
  C extends PortfolioItemCollectionKey,
> extends Omit<CardProps, "children"> {
  item: PortfolioItemEntry<C>;
  /** href for portfolio items page */
  href: string;
  cover_sources?: ImageSource[];
  loading?: "lazy" | "eager";
}

/** A preview card of a portfolio item */
export default function PortfolioItemCard<C extends PortfolioItemCollectionKey>(
  props: PortfolioItemCardProps<C>,
) {
  const {
    item,
    href,
    cover_sources,
    loading,
    class: class_attribute,
    className,
    ...card_props
  } = props;

  /** Cover image attributes */
  const cover_attributes = useMemo(
    () =>
      item.data.cover instanceof Object
        ? {
            src: item.data.cover.src,
            width: item.data.cover.width,
            height: item.data.cover.height,
          }
        : { src: item.data.cover },
    [item.data.cover],
  );

  /** Date object */
  const date = useMemo(
    () =>
      item.data.date instanceof Date
        ? item.data.date
        : new Date(item.data.date),
    [item.data.date],
  );

  return (
    <Card
      {...card_props}
      class={clsx("portfolio-item-card", class_attribute, className)}
      aria-labelledby={item.id}
    >
      <div class="portfolio-item-card__cover">
        <Image
          {...cover_attributes}
          sources={cover_sources}
          placeholder-url={item.placeholders?.cover}
          alt={item.data["cover-alt"] ?? ""}
          loading={loading ?? "lazy"}
        />
      </div>

      <div class="portfolio-item-card__content">
        <Card.Header class="portfolio-item-card__header">
          <h3 id={item.id} class="portfolio-item-card__title">
            {item.data.title}
          </h3>

          <time
            class="portfolio-item-card__date subtitle-2"
            datetime={date.toISOString()}
          >
            {formatDate(date, {
              month: { digits: 2 },
              year: true,
              seperator: "/",
            })}
          </time>
        </Card.Header>

        <ul class="portfolio-item-card__skills">
          {item.data.skills?.map((skill) => (
            <li>
              <SkillBadge skill={skill} />
            </li>
          ))}
        </ul>

        <Card.Body class="portfolio-item-card__body">
          <p>{item.data.description}</p>
        </Card.Body>

        <Card.Footer class="portfolio-item-card__footer">
          <Button
            class="portfolio-item-card__more-link"
            icon="arrow-right"
            variant="icon-right"
            href={href}
          >
            See more
            <span class="visually-hidden"> about {item.data.title}</span>
          </Button>
        </Card.Footer>
      </div>
    </Card>
  );
}
