import clsx from "clsx";
import type { ButtonHTMLAttributes, JSX, MouseEventHandler } from "preact";
import { useContext } from "preact/hooks";
import MenuContext from "../context";

export interface MenuTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-expanded"
> {}

export type MenuTriggerComponent = (props: MenuTriggerProps) => JSX.Element;

/** Button for triggering the display of a menu */
const MenuTrigger: MenuTriggerComponent = (props) => {
  const {
    className,
    class: class_attribute,
    onClick,
    ...button_attributes
  } = props;

  const menu_context = useContext(MenuContext);

  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    menu_context?.setIsExpanded((value) => !value);
  };

  return (
    <button
      class={clsx(
        "menu__trigger",
        menu_context?.is_expanded && "menu__trigger--expanded",
        class_attribute,
        className,
      )}
      onClick={handleTriggerClick}
      aria-expanded={menu_context?.is_expanded ?? false}
      {...button_attributes}
    />
  );
};

export default MenuTrigger;
