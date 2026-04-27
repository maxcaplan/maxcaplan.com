import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

import { icon_names } from "maxcaplan-icons";

/** Skill tags */
const skills = defineCollection({
  loader: file("./src/content/skills.json"),
  schema: z.object({
    icon: z.literal(icon_names).optional(),
    colour: z.literal(["red", "yellow", "green", "blue"]).optional(),
  }),
});

/** Portfolio work items */
const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      skills: z.array(reference("skills")).optional(),
      cover: image(),
      "cover-alt": z.string().optional(),
      "demo-url": z.string().optional(),
      "source-url": z.string().optional(),
      order: z.int().optional(),
    }),
});

export const collections = { work, skills };
