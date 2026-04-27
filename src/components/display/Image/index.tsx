import clsx from "clsx";
import path from "path";
import type { ImgHTMLAttributes } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useMemo } from "preact/hooks";

export const IMAGE_FORMATS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "svg",
  "avif",
] as const;

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

export interface ImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "children"
> {
  src: string;
  sources?: ImageSource[];
}

/** Seperate the params section of a url from a url */
const seperateUrlParams = (url: string): [string, string | undefined] => {
  const parts = url.split("?");
  return [parts[0], parts.at(1)];
};

/** Get the file extension of an image src value */
const getSrcExtension = (src: string) => {
  return path
    .extname(seperateUrlParams(src)[0])
    .replace("^[\.]", "")
    .trim()
    .toLowerCase();
};

/** Get the format of an image src value */
const getSrcFormat = (src: string): ImageFormat | undefined => {
  const src_extension = getSrcExtension(src);

  return (IMAGE_FORMATS as readonly string[]).includes(src_extension)
    ? (src_extension as ImageFormat)
    : undefined;
};

/** Get src value for an image source */
const getSourceSrc = (source: ImageSource, src: string) => {
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
const getSourceType = (source: ImageSource, src: string) => {
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

const useImageSources = (props: ImageProps) => {
  return useMemo(() => {
    if (!props.sources || !props.sources.some((item) => item.media)) {
      return props.sources;
    }

    const fallback_src_format = getSrcFormat(props.src);

    return props.sources
      .reduce<ImageSource[][]>(
        (image_sources, source) => {
          image_sources[0].push(source);

          // Add fallback sources for media values if not set
          if (
            props.sources?.find((item) => {
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
  }, [props.sources, props.src]);
};

/** Image component wrapper */
const ImageWrapper = (props: PropsWithChildren<Partial<ImageProps>>) => {
  return props.sources !== undefined && props.sources.length > 0 ? (
    <picture>{props.children}</picture>
  ) : (
    <>{props.children}</>
  );
};

/** An image */
export default function Image(props: ImageProps) {
  const { class: class_attribute, className, sources, ...attributes } = props;

  /** Picture source attributes */
  const image_sources = useImageSources(props);

  return (
    <ImageWrapper {...props}>
      {image_sources?.map((source) => (
        <source
          srcset={getSourceSrc(source, props.src)}
          type={getSourceType(source, props.src)}
          media={source.media}
        />
      ))}
      <img {...attributes} class={clsx("image", class_attribute, className)} />
    </ImageWrapper>
  );
}
