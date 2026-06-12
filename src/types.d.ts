import type { CollectionEntry, CollectionKey } from "astro:content";
import type { IMAGE_FORMATS, SOCIAL_MEDIAS } from "./constants";
import type { GetImageResult } from "astro";

export type ImageFormat = (typeof IMAGE_FORMATS)[number];

export interface ImageSource {
  src?: string;
  format?: ImageFormat;
  media?: string;
}

export type SocialMedia = keyof typeof SOCIAL_MEDIAS;

export type WithSkillsEntries<C extends CollectionEntry<CollectionKey>> = Omit<
  C,
  "data"
> & {
  data: Omit<C["data"], "skills"> & { skills?: CollectionEntry<"skills">[] };
};

export type PortfolioItemCollectionKey = "work" | "projects";

export type PortfolioItemEntry<C extends PortfolioItemCollectionKey> =
  WithSkillsEntries<CollectionEntry<C>> & {
    placeholders?: {
      cover?: string;
    };
    images?: {
      cover_lg?: GetImageResult;
      cover_md?: GetImageResult;
      cover_sm?: GetImageResult;
      cover_lg_webp?: GetImageResult;
      cover_md_webp?: GetImageResult;
      cover_sm_webp?: GetImageResult;
    };
  };

export type WorkItemEntry = PortfolioItemEntry<"work">;
export type ProjectEntry = PortfolioItemEntry<"projects">;

export type PortfolioItemEntryType = {
  [K in PortfolioItemCollectionKey]: PortfolioItemEntry<K>;
}[PortfolioItemCollectionKey];
