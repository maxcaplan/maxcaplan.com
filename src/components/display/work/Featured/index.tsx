import "./styles.scss";

import type { CollectionEntry } from "astro:content";
import WorkCard from "@/components/display/work/Card";
import type { WorkItemEntry } from "@/types";

interface FeaturedWorkProps {
  /** Work item entries. First 3 will be displayed */
  entries: WorkItemEntry[];
}

/** Grid of 3 cards displaying work items */
export default function FeaturedWorkGrid(props: FeaturedWorkProps) {
  return (
    <section class="featured-work" aria-labelledby="work">
      <div class="featured-work__header">
        <h2 id="work" class="featured-work__title display-2">
          <span aria-hidden>01</span> <span>Work</span>
        </h2>

        <p class="featured-work__subtitle subtitle-1">
          a sample of the cool things i got to build with some amazing clients
        </p>
      </div>

      {props.entries.slice(0, 3).map((entry, idx) => (
        <div class="featured-work__card-wrapper">
          <WorkCard
            key={entry.id}
            class="featured-work__card"
            id={entry.id}
            title={entry.data.title}
            description={entry.data.description}
            date={entry.data.date}
            skills={entry.data.skills}
            cover={entry.data.cover}
            cover-alt={entry.data["cover-alt"]}
          />
        </div>
      ))}
    </section>
  );
}
