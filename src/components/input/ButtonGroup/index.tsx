import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import type { ButtonGroupItemComponent } from "./Item";
import ButtonGroupItem from "./Item";

export interface ButtonGroupProps extends HTMLAttributes<HTMLUListElement> {
  /** Flow direction of the group */
  direction?: "row" | "column";
  /** Flow wrap of the group */
  wrap?: boolean;
}

export interface ButtonGroupComponent {
  (props: ButtonGroupProps): JSX.Element;
  Item: ButtonGroupItemComponent;
}

/** A list of buttons that are grouped together */
const ButtonGroup: ButtonGroupComponent = (props) => {
  const {
    class: class_attribute,
    className,
    direction,
    wrap,
    ...attributes
  } = props;

  return (
    <ul
      {...attributes}
      class={clsx(
        "button-group",
        direction === "column" && "button-group--column",
        wrap && "button-group--wrap",
        class_attribute,
        className,
      )}
    />
  );
};

ButtonGroup.Item = ButtonGroupItem;

export default ButtonGroup;
