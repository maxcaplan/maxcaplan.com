import "./styles.scss";

import clsx from "clsx";

interface SeperatorProps {
  orientation?: "horizontal" | "vertical";
  style?: "solid" | "dashed";
}

/** Visually seperate elements with a horizontal or vertical line */
export default function Seperator(props: SeperatorProps) {
  return (
    <div
      class={clsx(
        "seperator",
        props.orientation === "vertical" ? "seperator--vertical" : undefined,
        props.style === "dashed" ? "seperator--dashed" : undefined,
      )}
    />
  );
}
