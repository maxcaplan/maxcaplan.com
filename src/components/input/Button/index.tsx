import "./styles.scss";

import clsx from "clsx";
import type { IconName, IconStyle } from "maxcaplan-icons";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentChildren,
} from "preact";
import { useIcon } from "@/util/hooks";

type LinkButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonColour =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "icon-left" | "icon-right" | "icon";

interface ButtonProps extends LinkButtonAttributes {
  colour?: ButtonColour;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: IconName;
  "icon-style"?: IconStyle;
}

/** Button component wrapper */
const ButtonWrapper = (
  props: ButtonProps & { inner_children?: ComponentChildren },
) => {
  const {
    colour,
    variant,
    icon,
    size,
    class: class_attribute,
    className,
    inner_children,
    ...attributes
  } = props;

  const has_colour = colour !== undefined && colour !== "default";
  const has_variant = icon !== undefined || variant !== undefined;
  const has_size = size !== undefined && size !== "md";

  const is_anchor = props.href !== undefined;
  const is_icon_variant = inner_children === undefined && icon !== undefined;

  const classes = clsx(
    "button",
    has_colour && `button--${colour}`,
    has_size && `button--${size}`,
    has_variant &&
      `button--${variant || (is_icon_variant && "icon") || "icon-left"}`,
    class_attribute,
    className,
  );

  return is_anchor ? (
    <a {...attributes} class={classes} />
  ) : (
    <button {...attributes} class={classes} />
  );
};

/** Interactive component presented as a button */
export default function Button(props: ButtonProps) {
  const { children, ...wrapper_props } = props;

  const Icon = useIcon(props.icon, {
    "icon-style": props["icon-style"],
    width: 26,
    height: 26,
  });

  return (
    <ButtonWrapper {...wrapper_props} inner_children={children}>
      <span class="button__inner">
        {props.variant !== "icon-right" && <Icon />}
        {children}
        {props.variant === "icon-right" && <Icon />}
      </span>
    </ButtonWrapper>
  );
}
