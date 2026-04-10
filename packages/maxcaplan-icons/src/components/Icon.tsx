import React, { useMemo } from "react";

export interface IconProps<
  Styles extends string | number | symbol,
> extends Omit<React.ComponentPropsWithRef<"svg">, "children"> {
  ["icon-style"]?: Styles;
  title?: string;
}

export type Icon<Styles extends string | number | symbol> = (
  props?: IconProps<Styles>,
) => React.JSX.Element;

export interface IconStyleData {
  root: (props?: React.ComponentPropsWithRef<"svg">) => React.JSX.Element;
  content: React.ReactNode;
}

/** Create a new icon component */
export function createIconComponent<Styles extends string | number | symbol>(
  key: string,
  styles: Record<Styles, IconStyleData>,
): Icon<Styles> {
  if (Object.values(styles).length <= 0) {
    throw new Error(`Cannot create icon ${key} component with no styles`);
  }

  return function Icon(props) {
    const {
      "icon-style": icon_style,
      title,
      className,
      ...element_props
    } = props ?? {};

    const IconStyle = useMemo(
      () =>
        icon_style !== undefined && styles[icon_style] !== undefined
          ? styles[icon_style]
          : Object.values<IconStyleData>(styles)[0], // Default style
      [icon_style],
    );

    return (
      <IconStyle.root
        className={[`mc-icon mc-icon--${key}`, className]
          .filter((v) => !!v)
          .join(" ")}
        {...element_props}
      >
        {title && <title>{title}</title>}
        {IconStyle.content}
      </IconStyle.root>
    );
  };
}
