import type { CollectionEntry, CollectionKey } from "astro:content";
import type { IMAGE_FORMATS } from "./constants";

export type ImageFormat = (typeof IMAGE_FORMATS)[number];

export interface ImageSource {
  src?: string;
  /** src file name prefix */
  src_prefix?: string;
  /** src file name suffix */
  src_suffix?: string;
  format?: ImageFormat;
  media?: string;
}

export type WithSkillsEntries<C extends CollectionEntry<CollectionKey>> = Omit<
  C,
  "data"
> & {
  data: Omit<C["data"], "skills"> & { skills?: CollectionEntry<"skills">[] };
};

export type WorkItemEntry = WithSkillsEntries<CollectionEntry<"work">> & {
  placeholders?: {
    cover?: string;
  };
};

export type ProjectEntry = WithSkillsEntries<CollectionEntry<"projects">> & {
  placeholders?: {
    cover?: string;
  };
};
