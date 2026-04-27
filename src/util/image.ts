import path from "path";
import sharp, { type KernelEnum } from "sharp";
import { IMAGE_FORMATS } from "@/constants";
import type { ImageFormat, ImageSource } from "@/types";

/** Seperate the params section of a url from a url */
const seperateUrlParams = (url: string): [string, string | undefined] => {
  const parts = url.split("?");
  return [parts[0], parts.at(1)];
};

/** Get the file extension of an image src value */
export const getSrcExtension = (src: string) => {
  return path
    .extname(seperateUrlParams(src)[0])
    .replace("^[\.]", "")
    .trim()
    .toLowerCase();
};

/** Get the format of an image src value */
export const getSrcFormat = (src: string): ImageFormat | undefined => {
  const src_extension = getSrcExtension(src);

  return (IMAGE_FORMATS as readonly string[]).includes(src_extension)
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
    const [src_url, src_params] = seperateUrlParams(src);
    const src_path = path.parse(src_url);

    if (source.format) {
      // Change fallback src file extension
      src_path.base = src_path.base.replace(src_path.ext, `.${source.format}`);
      src_path.ext = `.${source.format}`;
    }

    // Add prefix and/or suffix to fallback src file name
    src_path.base = src_path.base.replace(
      src_path.name,
      (source.src_prefix || "") + src_path.name,
    );
    src_path.base = src_path.base.replace(
      src_path.name,
      src_path.name + (source.src_suffix || ""),
    );

    return path.format(src_path) + (src_params ? `?${src_params}` : "");
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

/** Create a placeholder for an image to display while loading */
export async function generatePlaceholderUrl(
  image: string,
  kernel?: keyof KernelEnum,
) {
  const image_meta = await sharp(image).metadata();
  const resize_scale =
    image_meta.width >= image_meta.height ? { width: 42 } : { height: 42 };

  const resized_image_buffer = await sharp(image)
    .resize({
      ...resize_scale,
      kernel: kernel || "nearest",
    })
    .toBuffer();

  return `data:image/${image_meta.format};base64,${resized_image_buffer.toString("base64")}`;
}
