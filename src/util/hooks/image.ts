import { useMemo } from "preact/hooks";
import type { ImageSource } from "@/types";
import { getSrcFormat } from "../image";

/** Process image sources data to create array of picture source element attribute data */
export const useImageSources = (src: string, sources?: ImageSource[]) => {
  return useMemo(() => {
    if (!sources || !sources.some((item) => item.media)) {
      return sources;
    }

    const fallback_src_format = getSrcFormat(src);

    return sources
      .reduce<ImageSource[][]>(
        (image_sources, source) => {
          image_sources[0].push(source);

          // Add fallback sources for media values if not set
          if (
            sources?.find((item) => {
              if (item.media !== source.media) {
                return false;
              }

              return item.src
                ? getSrcFormat(item.src) === fallback_src_format
                : item.format === fallback_src_format;
            }) === undefined
          ) {
            image_sources[1].push({
              src_prefix: source.src_prefix,
              src_suffix: source.src_suffix,
              format: fallback_src_format,
              media: source.media,
            });
          }

          return image_sources;
        },
        [[], []],
      )
      .flat();
  }, [sources, src]);
};
