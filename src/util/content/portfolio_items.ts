import type {
  PortfolioItemCollectionKey,
  PortfolioItemEntry,
  ProjectEntry,
  WorkItemEntry,
} from "@/types";
import {
  generateCollectionImagePlaceholders,
  generateCollectionImages,
} from "@/util/content";
import { getCollection, getEntries } from "astro:content";
import { sortOr } from "@/util/client/array";

export interface GetPortfolioItemsCollectionOptions {
  generate_images?: boolean;
}

/** Get entries for a portfolio item collection */
export async function getPortfolioItemsCollection<
  C extends PortfolioItemCollectionKey,
>(
  collection: C,
  options?: GetPortfolioItemsCollectionOptions,
): Promise<PortfolioItemEntry<C>[]> {
  // Get portfolio item entries
  const entries = await generateCollectionImagePlaceholders(
    (await getCollection(collection)) as PortfolioItemEntry<C>[],
    (entry) => ({ cover: entry.data.cover.src }), // Generate cover image placeholder
  );

  // Get skills data for all entries
  const entries_with_skills = await Promise.all(
    entries.map(async (entry) => {
      const skills = entry.data.skills
        ? await getEntries(entry.data.skills)
        : undefined;

      return { ...entry, data: { ...entry.data, skills } };
    }),
  );

  return !!options?.generate_images
    ? await generatePortfolioItemsCollectionImages(entries_with_skills)
    : entries_with_skills;
}

/** Generate images for entries of a portfolio items collection */
export async function generatePortfolioItemsCollectionImages<
  C extends PortfolioItemCollectionKey,
>(entries: PortfolioItemEntry<C>[]): Promise<PortfolioItemEntry<C>[]> {
  return generateCollectionImages(entries, (entry) => {
    const cover_src = entry.data.cover;

    return {
      cover_lg: { src: cover_src, format: "png", width: 1380 },
      cover_md: { src: cover_src, format: "png", width: 800 },
      cover_sm: { src: cover_src, format: "png", width: 340 },
      cover_lg_webp: { src: cover_src, format: "webp", width: 1380 },
      cover_md_webp: { src: cover_src, format: "webp", width: 800 },
      cover_sm_webp: { src: cover_src, format: "webp", width: 340 },
    };
  });
}

/** Get sorted work collection entries */
export async function getWorkCollection(
  options?: GetPortfolioItemsCollectionOptions,
): Promise<WorkItemEntry[]> {
  const entries = await getPortfolioItemsCollection("work", options);

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
export async function getProjectsCollection(
  options?: GetPortfolioItemsCollectionOptions,
): Promise<ProjectEntry[]> {
  const entries = await getPortfolioItemsCollection("projects", options);

  // Sort entries by date
  return entries.sort(
    (a, b) => (a.data.date.getTime() - b.data.date.getTime()) * -1,
  );
}
