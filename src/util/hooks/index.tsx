import {
  type Icon,
  type IconProps,
  type IconStyle,
  icons,
} from "maxcaplan-icons";
import { useMemo } from "preact/hooks";

/** Get an icon component for a given icon name */
export const useIcon = (icon?: string, icon_props?: IconProps<IconStyle>) => {
  return useMemo(() => {
    const icon_entry = Object.entries(icons).find(
      ([icon_key]) => icon_key === icon,
    )?.[1];

    if (import.meta.env.DEV && icon_entry === undefined) {
      console.warn(`Could not find icon with name '${icon}'`);
    }

    const IconComponent =
      icon_entry === undefined ? undefined : (icon_entry as Icon<IconStyle>);

    return () => {
      return IconComponent === undefined ? (
        <></>
      ) : (
        <IconComponent {...icon_props} />
      );
    };
  }, [icon, icon_props]);
};
