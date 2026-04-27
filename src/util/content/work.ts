import { type CollectionEntry, getCollection, getEntries } from "astro:content";
import type { WorkItemEntry } from "@/types";

/** Get sorted work collection entries */
export async function getWorkCollection(): Promise<WorkItemEntry[]> {
  const entries = await Promise.all(
    (await getCollection("work")).map(async (entry) => {
      const skills = entry.data.skills
        ? await getEntries(entry.data.skills)
        : undefined;

      return { ...entry, data: { ...entry.data, skills } };
    }),
  );

  return entries.sort((a, b) => {
    // Sort by order if both items have an order value
    if (a.data.order !== undefined && b.data.order !== undefined) {
      return a.data.order > b.data.order
        ? 1
        : a.data.order === b.data.order
          ? 0
          : -1;
    }

    if (a.data.order !== undefined) {
      return -1;
    }

    if (b.data.order !== undefined) {
      return 1;
    }

    // Sort by date if neither item has an order value
    return (a.data.date.getTime() - b.data.date.getTime()) * -1;
  });
}
