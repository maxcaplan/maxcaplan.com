import {
  type CollectionEntry,
  type CollectionKey,
  getCollection,
} from "astro:content";
import { generatePlaceholderUrl } from "../image";

/** Get a content collection and generate placeholder images for all sources returned by a callback */
export async function getCollectionWithImagePlaceholders<
  C extends CollectionKey,
  K extends string,
>(
  collection: C,
  /** Image sources callback called for each entry of a collection */
  srcs: (entry: CollectionEntry<C>) => Record<K, string | undefined>,
) {
  return await Promise.all(
    (await getCollection(collection)).map(async (entry) => {
      const placeholders = (
        await Promise.all(
          // Generate image placeholder values
          Object.entries<string | undefined>(srcs(entry)).map(
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
    }),
  );
}
