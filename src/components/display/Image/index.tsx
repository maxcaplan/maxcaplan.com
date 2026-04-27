import "./styles.scss";

import clsx from "clsx";
import type { CSSProperties, ImgHTMLAttributes } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useMemo } from "preact/hooks";
import type { ImageSource } from "@/types";
import { useImageSources } from "@/util/hooks/image";
import { getSourceSrc, getSourceType } from "@/util/image";

export interface ImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "children"
> {
  src: string;
  sources?: ImageSource[];
  style?: CSSProperties;
  "placeholder-url"?: string;
}

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
  const {
    class: class_attribute,
    className,
    sources,
    "placeholder-url": placeholder_url,
    style,
    ...attributes
  } = props;

  /** Picture source attributes */
  const image_sources = useImageSources(props.src, props.sources);

  const background_styles = useMemo(() => {
    if (placeholder_url === undefined) {
      return undefined;
    }

    const background_image_value = `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><image width="100%" height="100%" preserveAspectRatio="none" href="${placeholder_url}" image-rendering="optimizeSpeed" style="image-rendering:pixelated"/></svg>')`;

    return {
      backgroundImage: background_image_value,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundOrigin: "border-box",
    };
  }, [placeholder_url]);

  return (
    <ImageWrapper {...props}>
      {image_sources?.map((source) => (
        <source
          srcset={getSourceSrc(source, props.src)}
          type={getSourceType(source, props.src)}
          media={source.media}
        />
      ))}

      <img
        {...attributes}
        class={clsx("image", class_attribute, className)}
        style={{ ...style, ...background_styles }}
      />
    </ImageWrapper>
  );
}
