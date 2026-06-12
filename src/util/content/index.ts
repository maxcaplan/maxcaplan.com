import { generatePlaceholderUrl } from "@/util/placeholders";
import type { GetImageResult, UnresolvedImageTransform } from "astro";
import { getImage } from "astro:assets";

export type ImageSourcesCallback<T, K extends string> = (
  entry: T,
) => Partial<Record<K, string>>;

export type ImageTransformCallback<T, K extends string> = (
  entry: T,
) => Partial<Record<K, UnresolvedImageTransform>>;

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
  const image_sources = entryImageSources(entry);

  const placeholders = (
    await Promise.all(
      // Generate image placeholder values
      Object.entries<string | undefined>(image_sources).map(
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

/** Generate images for each entry in a collection */
export async function generateCollectionImages<T, K extends string>(
  entries: T[],
  entryImageTransforms: ImageTransformCallback<T, K>,
) {
  return Promise.all(
    entries.map(async (entry) =>
      generateEntryImages(entry, entryImageTransforms),
    ),
  );
}

/** Generate images for a collection entry */
export async function generateEntryImages<T, K extends string>(
  entry: T,
  entryImageTransforms: ImageTransformCallback<T, K>,
) {
  const image_transforms = entryImageTransforms(entry);

  const images = (
    await Promise.all(
      // Generate images
      Object.entries<UnresolvedImageTransform | undefined>(
        image_transforms,
      ).map<Promise<[K, GetImageResult | undefined]>>(
        async ([image_key, transform]) => {
          if (transform) {
            try {
              return [image_key as K, await getImage(transform)];
            } catch (e) {
              if (import.meta.env.SSR) {
                console.error(e);
              }

              return [image_key as K, undefined];
            }
          }

          return [image_key as K, undefined];
        },
      ),
    )
  )
    // Create images map
    .reduce<Partial<Record<K, GetImageResult>>>(
      (images, [image_key, transform]) => {
        images[image_key as K] = transform;
        return images;
      },
      {},
    );

  return { ...entry, images };
}
