import "./styles.scss";

import clsx from "clsx";
import type { CSSProperties, ImgHTMLAttributes } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useMemo } from "preact/hooks";
import type { ImageSource } from "@/types";
import { createPlaceholderImage, getSourceType } from "@/util/client/image";

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

  const background_styles = useMemo(() => {
    return placeholder_url
      ? {
          backgroundImage: createPlaceholderImage(placeholder_url),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "border-box",
        }
      : undefined;
  }, [placeholder_url]);

  return (
    <ImageWrapper {...props}>
      {sources?.map((source) => (
        <source
          srcset={source.src}
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
