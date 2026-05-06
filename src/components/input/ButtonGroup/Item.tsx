import type { JSX } from "preact";
import type { ButtonProps } from "@/components/input/Button";
import Button from "@/components/input/Button";

export interface ButtonGroupItemProps extends ButtonProps {}

export type ButtonGroupItemComponent = (
  props: ButtonGroupItemProps,
) => JSX.Element;

/** A button item for a button group */
const ButtonGroupItem: ButtonGroupItemComponent = (props) => {
  return (
    <li class="button-group__item">
      <Button {...props} />
    </li>
  );
};

export default ButtonGroupItem;
