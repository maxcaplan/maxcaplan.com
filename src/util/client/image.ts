import { IMAGE_FORMATS } from "@/constants";
import type { ImageFormat, ImageSource } from "@/types";
import { getUrlExtension } from "./url";

/** Get the format of an image src value */
export const getSrcFormat = (src: string): ImageFormat | undefined => {
  const src_extension = getUrlExtension(src);

  return src_extension &&
    (IMAGE_FORMATS as readonly string[]).includes(src_extension)
    ? (src_extension as ImageFormat)
    : undefined;
};

/** Get type value for an image source */
export const getSourceType = (source: ImageSource, src: string) => {
  // Get format value from source or source src or fallback src
  let format: string | undefined =
    source.format || getSrcFormat(source.src || src);

  // Ensure format is valid
  if (format === undefined) {
    return;
  }

  if (format === "jpg") {
    format = "jpeg";
  }

  if (format === "svg") {
    format = "svg+xml";
  }

  return `image/${format}`;
};

/** Create a CSS value for a placeholder image from a url */
export const createPlaceholderImage = (placeholder_url: string) => {
  return `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><image width="100%" height="100%" preserveAspectRatio="none" href="${placeholder_url}" image-rendering="optimizeSpeed" style="image-rendering:pixelated"/></svg>')`;
};
