import { IMAGE_FORMATS } from "@/constants";
import type { ImageFormat, ImageSource } from "@/types";
import { getUrlExtension, getUrlFilename, replaceUrlFilename } from "./url";

/** Seperate the params section of a url from a url */
const seperateUrlParams = (url: string): [string, string | undefined] => {
  const parts = url.split("?");
  return [parts[0], parts.at(1)];
};

/** Get the format of an image src value */
export const getSrcFormat = (src: string): ImageFormat | undefined => {
  const src_extension = getUrlExtension(src);

  return src_extension &&
    (IMAGE_FORMATS as readonly string[]).includes(src_extension)
    ? (src_extension as ImageFormat)
    : undefined;
};

/** Get src value for an image source */
export const getSourceSrc = (source: ImageSource, src: string) => {
  // Return sources src value
  if (source.src !== undefined) {
    return source.src;
  }

  // Return fallback src with altered extension and/or file name
  if (source.format || source.src_prefix || source.src_suffix) {
    let [src_url, src_params] = seperateUrlParams(src);
    const src_extension = getUrlExtension(src_url);

    if (source.format) {
      // Set src file format
      if (src_extension) {
        src_url = src_url.replace(`.${src_extension}`, `.${source.format}`);
      } else {
        src_url += `.${source.format}`;
      }
    }

    if (source.src_prefix || source.src_suffix) {
      const src_filename = getUrlFilename(src_url);

      if (source.src_prefix) {
        src_url = replaceUrlFilename(src_url, source.src_prefix + src_filename);
      }

      if (source.src_suffix) {
        src_url = replaceUrlFilename(src_url, src_filename + source.src_suffix);
      }
    }

    return src_url + (src_params ? `?${src_params}` : "");
  }

  return;
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
