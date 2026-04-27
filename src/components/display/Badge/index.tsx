import "./styles.scss";

import clsx from "clsx";
import type { IconName, IconStyle } from "maxcaplan-icons";
import type { HTMLAttributes } from "preact";
import { useMemo } from "preact/hooks";
import { useIcon } from "@/util/hooks";

export type BadgeColour =
  | "default"
  | "primary"
  | "secondary"
  | "warning"
  | "danger";

export type BadgeVariant = "icon" | "icon-left" | "icon-right";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  colour?: BadgeColour;
  variant?: BadgeVariant;
  icon?: IconName;
  "icon-style"?: IconStyle;
}

/** A small label representing status or some other metadata */
export default function Badge(props: BadgeProps) {
  const {
    class: class_attribute,
    className,
    children,
    colour,
    variant,
    icon,
    "icon-style": icon_style,
    ...attributes
  } = props;

  const has_colour = colour !== undefined && colour !== "default";
  const has_variant = icon !== undefined || variant !== undefined;

  const is_icon_variant = children === undefined && icon !== undefined;

  const Icon = useIcon(icon, {
    width: 20,
    height: 20,
    "icon-style": icon_style,
  });

  return (
    <span
      {...attributes}
      class={clsx(
        "badge",
        has_colour && `badge--${colour}`,
        has_variant &&
          `badge--${variant || (is_icon_variant && "icon") || "icon-left"}`,
        class_attribute,
        className,
      )}
    >
      {variant !== "icon-right" && <Icon />}

      {children}

      {variant === "icon-right" && <Icon />}
    </span>
  );
}
