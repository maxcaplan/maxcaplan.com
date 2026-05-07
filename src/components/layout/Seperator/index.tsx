import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes } from "preact";

interface SeperatorProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  orientation?: "horizontal" | "vertical";
  "line-style"?: "solid" | "dashed";
}

/** Visually seperate elements with a horizontal or vertical line */
export default function Seperator(props: SeperatorProps) {
  const {
    class: class_attribute,
    className,
    orientation,
    "line-style": line_style,
    ...attributes
  } = props;

  return (
    <div
      {...attributes}
      class={clsx(
        "seperator",
        props.orientation === "vertical" && "seperator--vertical",
        props.style === "dashed" && "seperator--dashed",
        class_attribute,
        className,
      )}
    />
  );
}
