import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import { useMemo } from "preact/hooks";
import WorkCard from "@/components/display/work/Card";
import type { WorkItemEntry } from "@/types";

interface FeaturedWorkGridProps extends HTMLAttributes<HTMLElement> {
  /** Work item work. First 3 will be displayed */
  work: WorkItemEntry[];
}

/** Grid of 3 cards displaying work items */
export default function FeaturedWorkGrid(props: FeaturedWorkGridProps) {
  const {
    work,
    children,
    class: class_attribute,
    className,
    ...attributes
  } = props;

  const featured_work = useMemo(() => props.work.slice(0, 3), [props.work]);

  return (
    <section
      {...attributes}
      class={clsx("featured-work", class_attribute, className)}
    >
      {children}

      {featured_work.map((entry) => (
        <div class="featured-work__card-wrapper">
          <WorkCard key={entry.id} class="featured-work__card" work={entry} />
        </div>
      ))}
    </section>
  );
}
