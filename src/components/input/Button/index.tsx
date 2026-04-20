import "./styles.scss";

import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "preact";

type LinkButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonVariant = "default" | "primary" | "secondary" | "outline" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends LinkButtonAttributes {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: "left" | "right" | boolean;
}

/** Interactive component presented as a button */
export default function Button(props: ButtonProps) {
  const { variant, size, icon, children, ...attributes } = props;

  const variant_name = variant === "default" ? undefined : variant;
  const size_name = size === "md" ? undefined : size;
  const icon_name = icon === true ? undefined : icon;
  const is_anchor = props.href !== undefined;

  const classes = clsx(
    "button",
    !!variant && `button--${variant_name}`,
    !!size && `button--${size_name}`,
    !!icon &&
      (icon_name === undefined ? "button--icon" : `button--icon-${icon}`),
    props.class,
    props.className,
  );

  if (is_anchor) {
    return (
      <a {...attributes} class={classes}>
        <span class="button__inner">{children}</span>
      </a>
    );
  } else {
    return (
      <button {...attributes} class={classes}>
        <span class="button__inner">{children}</span>
      </button>
    );
  }
}
