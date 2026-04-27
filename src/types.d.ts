import type { CollectionEntry } from "astro:content";

export type WorkItemEntry = CollectionEntry<"work"> & {
  data: {
    skills?: CollectionEntry<"skills">[];
  };
};
