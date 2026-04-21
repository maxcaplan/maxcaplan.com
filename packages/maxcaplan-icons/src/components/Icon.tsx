import clsx from "clsx";
import React, { useMemo } from "react";

export interface IconProps<
  Styles extends string | number | symbol,
> extends Omit<React.ComponentPropsWithRef<"svg">, "children"> {
  ["icon-style"]?: Styles;
  title?: string;
  class?: string;
}

export type Icon<Styles extends string | number | symbol> = (
  props?: IconProps<Styles>,
) => React.JSX.Element;

export interface IconStyleComponent {
  root: (props?: React.ComponentPropsWithRef<"svg">) => React.JSX.Element;
  content: React.ReactNode;
}

/** Create a new icon component */
export function createIconComponent<Styles extends string | number | symbol>(
  key: string,
  styles: Record<Styles, IconStyleComponent>,
): Icon<Styles> {
  if (Object.values(styles).length <= 0) {
    throw new Error(`Cannot create icon ${key} component with no styles`);
  }

  return function Icon(props) {
    const {
      "icon-style": icon_style,
      title,
      class: elementClass,
      className,
      "aria-hidden": ariaHidden,
      ...element_props
    } = props ?? {};

    // Get the component for an icon style
    const IconStyleComponent = useMemo(
      () =>
        icon_style !== undefined && styles[icon_style] !== undefined
          ? styles[icon_style]
          : Object.values<IconStyleComponent>(styles)[0], // Fallback to default style
      [icon_style],
    );

    return (
      <IconStyleComponent.root
        className={clsx(`mc-icon mc-icon--${key}`, className, elementClass)}
        aria-hidden={ariaHidden === undefined && !title ? true : ariaHidden}
        {...element_props}
      >
        {title && <title>{title}</title>}
        {IconStyleComponent.content}
      </IconStyleComponent.root>
    );
  };
}
