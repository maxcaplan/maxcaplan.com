import type {
  PortfolioItemCollectionKey,
  PortfolioItemEntry,
  ProjectEntry,
  WorkItemEntry,
} from "@/types";
import { generateCollectionImagePlaceholders } from "@/util/content";
import { getCollection, getEntries } from "astro:content";
import { sortOr } from "@/util/client/array";

/** Get entries for a portfolio item collection */
export async function getPortfolioItemsCollection<
  C extends PortfolioItemCollectionKey,
>(collection: C): Promise<PortfolioItemEntry<C>[]> {
  // Get portfolio item entries
  const entries = await generateCollectionImagePlaceholders(
    (await getCollection(collection)) as PortfolioItemEntry<C>[],
    (entry) => ({ cover: entry.data.cover.src }), // Generate cover image placeholder
  );

  // Get skills data for all entries
  return await Promise.all(
    entries.map(async (entry) => {
      const skills = entry.data.skills
        ? await getEntries(entry.data.skills)
        : undefined;

      return { ...entry, data: { ...entry.data, skills } };
    }),
  );
}

/** Get sorted work collection entries */
export async function getWorkCollection(): Promise<WorkItemEntry[]> {
  const entries = await getPortfolioItemsCollection("work");

  // Sort entries by order value or date
  return sortOr(
    entries,
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
    (a, b) => (a.data.date.getTime() - b.data.date.getTime()) * -1,
  );
}

/** Get sorted projects collection entries */
export async function getProjectsCollection(): Promise<ProjectEntry[]> {
  const entries = await getPortfolioItemsCollection("projects");

  // Sort entries by date
  return entries.sort(
    (a, b) => (a.data.date.getTime() - b.data.date.getTime()) * -1,
  );
}
