import clsx from "clsx";
import type { ImgHTMLAttributes } from "preact";
import type { PropsWithChildren } from "preact/compat";
import type { ImageSource } from "@/types";
import { useImageSources } from "@/util/hooks/image";
import { getSourceSrc, getSourceType } from "@/util/image";

export interface ImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "children"
> {
  src: string;
  sources?: ImageSource[];
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
  const { class: class_attribute, className, sources, ...attributes } = props;

  /** Picture source attributes */
  const image_sources = useImageSources(props.src, props.sources);

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
