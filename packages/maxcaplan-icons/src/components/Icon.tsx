import clsx from "clsx";
import React, { useMemo } from "react";

// export interface IconProps<
//   Styles extends string | number | symbol,
// > extends Omit<React.ComponentPropsWithRef<"svg">, "children"> {
//   ["icon-style"]?: Styles;
//   title?: string;
//   class?: string;
// }

export interface IconProps<
  Styles extends string | number | symbol,
> extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
  ["icon-style"]?: Styles;
  title?: string;
  class?: string;
}

interface IconRootProps extends React.SVGProps<SVGSVGElement> {}

export type Icon<Styles extends string | number | symbol> = (
  props?: IconProps<Styles>,
) => React.JSX.Element;

interface IconStyleComponent {
  root: (props: IconRootProps) => React.JSX.Element;
  content: React.JSX.Element;
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
      className,
      class: class_attribute,
      "aria-hidden": aria_hidden,
      ...root_props
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
        className={clsx(`mc-icon mc-icon--${key}`, class_attribute, className)}
        aria-hidden={aria_hidden === undefined && !title ? true : aria_hidden}
        {...root_props}
      >
        {title && <title>{title}</title>}
        {IconStyleComponent.content}
      </IconStyleComponent.root>
    );
  };
}
