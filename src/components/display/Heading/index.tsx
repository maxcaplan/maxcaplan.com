import clsx from "clsx";
import type { HTMLAttributes } from "preact";
import { useMemo } from "preact/hooks";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type HeadingType =
  | "display-1"
  | "display-2"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "eyebrow"
  | "subtitle-1"
  | "subtitle-2";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Level of the heading tag */
  level: HeadingLevel;
  /** Typography style of the heading */
  type?: HeadingType;
}

/** Heading text element */
export default function Heading(props: HeadingProps) {
  const {
    level,
    type,
    class: class_attribute,
    className,
    ...heading_attributes
  } = props;

  const attributes = useMemo(
    () => ({
      ...heading_attributes,
      class: clsx("heading", type, class_attribute, className),
    }),
    [heading_attributes, type, class_attribute, className],
  );

  switch (Math.round(Math.max(Math.min(level, 7), 1))) {
    case 1:
      return <h1 {...attributes} />;
    case 2:
      return <h2 {...attributes} />;
    case 3:
      return <h3 {...attributes} />;
    case 4:
      return <h4 {...attributes} />;
    case 5:
      return <h5 {...attributes} />;
    case 6:
      return <h6 {...attributes} />;
    case 7:
      return <p {...attributes} />;

    default:
      return <h1 {...attributes} />;
  }
}
