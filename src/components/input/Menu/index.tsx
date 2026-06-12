import "./styles.scss";

import type { JSX, HTMLAttributes, Consumer } from "preact";
import MenuContext, { type MenuContextValue } from "./context";
import { useState } from "preact/hooks";
import type { MenuTriggerComponent } from "./Trigger";
import MenuTrigger from "./Trigger";
import clsx from "clsx";
import type { MenuItemsComponent } from "./Items";
import MenuItems from "./Items";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenuComponent {
  (props: MenuProps): JSX.Element;
  /** Button for triggering the display of a menu */
  Trigger: MenuTriggerComponent;
  /** Container for items to be displayed when menu is expanded */
  Items: MenuItemsComponent;
  /** Menu context consumer */
  Consumer: Consumer<MenuContextValue | null>;
}

/** Display a menu triggered by a button */
const Menu: MenuComponent = (props) => {
  const { className, class: class_attribute, ...div_attributes } = props;

  const [is_expanded, setIsExpanded] = useState(false);

  return (
    <MenuContext.Provider value={{ is_expanded, setIsExpanded }}>
      <div
        class={clsx(
          "menu",
          is_expanded && "menu--expanded",
          class_attribute,
          className,
        )}
        {...div_attributes}
      />
    </MenuContext.Provider>
  );
};

Menu.Trigger = MenuTrigger;
Menu.Items = MenuItems;
Menu.Consumer = MenuContext.Consumer;

export default Menu;
