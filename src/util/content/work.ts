import { getEntries } from "astro:content";
import type { WorkItemEntry } from "@/types";
import { sortOr } from "../array";
import { getCollectionWithImagePlaceholders } from ".";

/** Get sorted work collection entries */
export async function getWorkCollection(): Promise<WorkItemEntry[]> {
  const entries = await getCollectionWithImagePlaceholders("work", (entry) => ({
    // Generate cover placeholder image
    cover: entry.data.cover.src,
  }));

  return sortOr(
    await Promise.all(
      // Get skill entries for each work entry
      entries.map(async (entry) => {
        const skills = entry.data.skills
          ? await getEntries(entry.data.skills)
          : undefined;

        return { ...entry, data: { ...entry.data, skills } };
      }),
    ),
    // Sort by order if both items have an order value
    (a, b) => {
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
    },
    // Sort by date if neither item has an order value
    (a, b) => (a.data.date.getTime() - b.data.date.getTime()) * -1,
  );
}
