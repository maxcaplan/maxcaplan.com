import {
  type CollectionEntry,
  type CollectionKey,
  getCollection,
} from "astro:content";
import { generatePlaceholderUrl } from "@/util/placeholders";

export type ImageSourcesCallback<T, K extends string> = (
  entry: T,
) => Partial<Record<K, string>>;

/** Generate placeholders for images of each entry in a collection */
export async function generateCollectionImagePlaceholders<T, K extends string>(
  entries: T[],
  entryImageSources: ImageSourcesCallback<T, K>,
) {
  return await Promise.all(
    entries.map(async (entry) =>
      generateEntryImagePlaceholders(entry, entryImageSources),
    ),
  );
}

/** Generate placeholders for images of a collection entry */
export async function generateEntryImagePlaceholders<T, K extends string>(
  entry: T,
  entryImageSources: ImageSourcesCallback<T, K>,
) {
  const placeholders = (
    await Promise.all(
      // Generate image placeholder values
      Object.entries<string | undefined>(entryImageSources(entry)).map(
        async ([src_key, src]) => {
          if (src) {
            try {
              return [
                src_key,
                await generatePlaceholderUrl(
                  import.meta.env.SSR
                    ? src.replace("@fs/", "").split("?")[0]
                    : src,
                ),
              ];
            } catch (e) {
              if (import.meta.env.SSR) {
                console.error(e);
              }

              return [src_key, undefined];
            }
          }

          return [src_key, undefined];
        },
      ),
    )
  )
    // Create placeholders map
    .reduce<Partial<Record<K, string | undefined>>>(
      (placeholder_srcs, [src_key, src]) => {
        placeholder_srcs[src_key as K] = src;
        return placeholder_srcs;
      },
      {},
    );

  return { ...entry, placeholders };
}
