import "./styles.scss";

import { useMemo } from "preact/hooks";
import WorkCard from "@/components/display/work/Card";
import type { WorkItemEntry } from "@/types";

interface FeaturedWorkGridProps {
  /** Work item entries. First 3 will be displayed */
  entries: WorkItemEntry[];
  "title-index"?: number;
}

/** Grid of 3 cards displaying work items */
export default function FeaturedWorkGrid(props: FeaturedWorkGridProps) {
  const title_index = useMemo(() => {
    if (props["title-index"] === undefined) {
      return "01";
    }

    const index = Math.abs(props["title-index"]);
    return index >= 10 ? index : "0" + index;
  }, [props["title-index"]]);

  const featured_work = useMemo(
    () => props.entries.slice(0, 3),
    [props.entries],
  );

  return (
    <section class="featured-work" aria-labelledby="work">
      <div class="featured-work__header">
        <h2 id="work" class="featured-work__title display-2">
          {title_index && <span aria-hidden>{title_index}</span>}{" "}
          <span>Work</span>
        </h2>

        <p class="featured-work__subtitle subtitle-1">
          A sample of the cool things i got to build with some amazing clients
        </p>
      </div>

      {featured_work.map((entry) => (
        <div class="featured-work__card-wrapper">
          <WorkCard key={entry.id} class="featured-work__card" work={entry} />
        </div>
      ))}
    </section>
  );
}
