import type { CollectionEntry } from "astro:content";
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

export type WorkItemEntry = CollectionEntry<"work"> & {
  data: {
    skills?: CollectionEntry<"skills">[];
  };
  placeholders: {
    cover?: string;
  };
};
