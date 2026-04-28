import { getEntries } from "astro:content";
import type { ProjectEntry } from "@/types";
import { getCollectionWithImagePlaceholders } from ".";

/** Get sorted project collection entries */
export async function getProjectCollection(): Promise<ProjectEntry[]> {
  const entries = await getCollectionWithImagePlaceholders(
    "projects",
    (entry) => ({
      // Generate cover placeholder image
      cover: entry.data.cover.src,
    }),
  );

  return (
    (
      await Promise.all(
        // Get skill entries for each project
        entries.map(async (entry) => {
          const skills = entry.data.skills
            ? await getEntries(entry.data.skills)
            : undefined;

          return { ...entry, data: { ...entry.data, skills } };
        }),
      )
    )
      // Sort by date newest to oldest
      .sort((a, b) => (a.data.date.getTime() - b.data.date.getTime()) * -1)
  );
}
