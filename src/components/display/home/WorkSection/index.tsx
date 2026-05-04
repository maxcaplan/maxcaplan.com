import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import { useMemo } from "preact/hooks";
import WorkCard from "@/components/display/work/Card";
import type { WorkItemEntry } from "@/types";
import { leadingZeros } from "@/util/client/format";
import HomeHeader from "../Header";

interface HomeWorkSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "aria-label" | "aria-labelledby"
> {
  /** Work item work. First 3 will be displayed */
  work: WorkItemEntry[];
  "section-index"?: number;
}

/** Grid of 3 cards displaying work items */
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
      class={clsx("featured-work", class_attribute, className)}
    >
      <HomeHeader>
        <HomeHeader.Title id="work">
          <span aria-hidden>{leadingZeros(section_index ?? 1, 2)}</span>
          <span>Work</span>
        </HomeHeader.Title>

        <HomeHeader.Subtitle>
          A sample of the cool things i got to build with some amazing clients
        </HomeHeader.Subtitle>
      </HomeHeader>

      {featured_work.map((entry) => (
        <div class="featured-work__card-wrapper">
          <WorkCard key={entry.id} class="featured-work__card" work={entry} />
        </div>
      ))}
    </section>
  );
}
