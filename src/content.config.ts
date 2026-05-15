import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

import { icon_names } from "maxcaplan-icons";

/** Portfoilio item base schema */
const portfolio_item_schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  skills: z.array(reference("skills")).optional(),
  "demo-url": z.string().optional(),
  "source-url": z.string().optional(),
  order: z.int().optional(),
});

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
    portfolio_item_schema.extend({
      cover: image(),
      "cover-alt": z.string().optional(),
    }),
});

/** Portfolio project items */
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    portfolio_item_schema.extend({
      cover: image(),
      "cover-alt": z.string().optional(),
    }),
});

export const collections = { work, projects, skills };
