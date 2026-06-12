import "./styles.scss";

import clsx from "clsx";
import { useMemo } from "preact/hooks";
import SkillBadge from "@/components/display/Badge/Skill";
import Card from "@/components/display/Card";
import Carousel from "@/components/display/Carousel";
import type { CarouselSlideItemProps } from "@/components/display/Carousel/SlideItem";
import Image from "@/components/display/Image";
import Button from "@/components/input/Button";
import type {
  ImageSource,
  PortfolioItemCollectionKey,
  PortfolioItemEntry,
} from "@/types";
import { formatDate } from "@/util/client/format";

export interface PortfolioItemSlideItemProps<
  C extends PortfolioItemCollectionKey,
> extends Omit<CarouselSlideItemProps, "children"> {
  item: PortfolioItemEntry<C>;
  /** href for portfolio items page */
  href: string;
  cover_sources?: ImageSource[];
  loading?: "lazy" | "eager";
}

/** Preview carousel slide for a portfolio item */
export default function PortfolioItemSlideItem<
  C extends PortfolioItemCollectionKey,
>(props: PortfolioItemSlideItemProps<C>) {
  const {
    item,
    href,
    cover_sources,
    loading,
    class: class_attribute,
    className,
    ...slide_props
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
    <Carousel.SlideItem
      {...slide_props}
      class={clsx("portfolio-item-slide-item", class_attribute, className)}
      aria-labelledby={item.id}
    >
      <div class="portfolio-item-slide-item__cover">
        <Image
          {...cover_attributes}
          sources={cover_sources}
          placeholder-url={item.placeholders?.cover}
          alt={item.data["cover-alt"] ?? ""}
          loading={loading ?? "lazy"}
        />
      </div>

      <div class="portfolio-item-slide-item__content">
        <Card.Header class="portfolio-item-slide-item__header">
          <h3 id={item.id} class="portfolio-item-slide-item__title">
            {item.data.title}
          </h3>

          <time
            class="portfolio-item-slide-item__date subtitle-2"
            datetime={date.toISOString()}
          >
            {formatDate(date, {
              month: { digits: 2 },
              year: true,
              seperator: "/",
            })}
          </time>
        </Card.Header>

        <ul class="portfolio-item-slide-item__skills">
          {item.data.skills?.map((skill) => (
            <li>
              <SkillBadge skill={skill} />
            </li>
          ))}
        </ul>

        <Card.Body class="portfolio-item-slide-item__body">
          <p>{item.data.description}</p>
        </Card.Body>

        <Card.Footer class="portfolio-item-slide-item__footer">
          <Button
            class="portfolio-item-slide-item__more-link"
            icon="arrow-right"
            variant="icon-right"
            href={href}
          >
            See more
            <span class="visually-hidden"> about {item.data.title}</span>
          </Button>
        </Card.Footer>
      </div>
    </Carousel.SlideItem>
  );
}
