import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import { useMemo } from "preact/hooks";
import HomeSectionHeader from "../Header";
import type { WorkItemEntry } from "@/types";
import { leadingZeros } from "@/util/client/format";
import PortfolioItemCard from "@/patterns/PortfolioItemCard";

interface HomeWorkSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "aria-label" | "aria-labelledby"
> {
  /** Work item work. First 3 will be displayed */
  work: WorkItemEntry[];
  "section-index"?: number;
}

/** Home page section for featured work */
export default function HomeWorkSection(props: HomeWorkSectionProps) {
  const {
    work,
    class: class_attribute,
    className,
    "section-index": section_index,
    ...attributes
  } = props;

  const featured_work = useMemo(() => props.work.slice(0, 3), [props.work]);

  return (
    <section
      {...attributes}
      aria-labelledby="work"
      class={clsx("home-work-section", class_attribute, className)}
    >
      <HomeSectionHeader class="home-work-section__header">
        <HomeSectionHeader.Title id="work" class="home-work-section__title">
          <span aria-hidden>{leadingZeros(section_index ?? 1, 2)}</span>
          <span>Work</span>
        </HomeSectionHeader.Title>

        <HomeSectionHeader.Subtitle class="home-work-section__subtitle">
          A sample of the cool things i got to build with some amazing clients
        </HomeSectionHeader.Subtitle>
      </HomeSectionHeader>

      {featured_work.map((entry) => (
        <div class="home-work-section__card-wrapper">
          <PortfolioItemCard
            key={entry.id}
            class="home-work-section__card"
            item={entry}
            href={`/work/${entry.id}`}
          />
        </div>
      ))}
    </section>
  );
}
