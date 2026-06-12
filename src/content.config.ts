import { defineCollection, reference, type SchemaContext } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

import { icon_names } from "maxcaplan-icons";

/** Portfoilio item schema */
const portfolio_item_schema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: image(),
    "cover-alt": z.string().optional(),
    skills: z.array(reference("skills")).optional(),
    "demo-url": z.string().optional(),
    "source-url": z.string().optional(),
    order: z.int().optional(),
  });

/** Skill tags collection */
const skills = defineCollection({
  loader: file("./src/content/skills.json"),
  schema: z.object({
    icon: z.literal(icon_names).optional(),
    colour: z.literal(["red", "yellow", "green", "blue"]).optional(),
  }),
});

/** Portfolio work collection */
const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: portfolio_item_schema,
});

/** Portfolio projects collection */
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: portfolio_item_schema,
});

export const collections = { work, projects, skills };
