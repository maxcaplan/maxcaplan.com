import "./styles.scss";

import clsx from "clsx";
import type { BaseHTMLAttributes, JSX } from "preact";
import { useContext } from "preact/hooks";
import MenuContext from "../context";

export interface MenuItemsProps extends BaseHTMLAttributes<HTMLDivElement> {}

export type MenuItemsComponent = (props: MenuItemsProps) => JSX.Element;

/** Container for items to be displayed when menu is expanded */
const MenuItems: MenuItemsComponent = (props) => {
  const { className, class: class_attribute, ...div_attributes } = props;

  const menu_context = useContext(MenuContext);

  return (
    <div
      class={clsx(
        "menu__items",
        menu_context?.is_expanded && "menu__items--expanded",
        class_attribute,
        className,
      )}
      {...div_attributes}
    />
  );
};

export default MenuItems;
