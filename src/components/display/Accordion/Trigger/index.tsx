import "./styles.scss";

import clsx from "clsx";
import type { IconName, IconProps, IconStyle } from "maxcaplan-icons";
import type { ButtonHTMLAttributes, JSX } from "preact";
import { useContext } from "preact/hooks";
import { useIcon } from "@/util/client/hooks";
import AccordionContext from "../context";

export interface AccordionTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-expanded" | "aria-controls" | "type" | "id"
> {
  icon?: IconName;
  "icon-props"?: IconProps<IconStyle>;
}

export type AccordionTriggerComponent = (
  props: AccordionTriggerProps,
) => JSX.Element;

const AccordionTrigger: AccordionTriggerComponent = (props) => {
  const {
    class: class_attribute,
    className,
    onClick,
    disabled,
    children,
    icon,
    "icon-props": icon_props,
    ...attributes
  } = props;

  const accordion_context = useContext(AccordionContext);

  const IconComponent = useIcon(icon, {
    ...icon_props,
    width: icon_props?.width ?? 26,
    height: icon_props?.height ?? 26,
    class: clsx("accordion__trigger-icon", icon_props?.class),
  });

  return (
    <button
      {...attributes}
      onClick={(e) => {
        onClick?.(e);
        accordion_context?.setIsExpanded((value) => !value);
      }}
      type="button"
      id={accordion_context?.id && `${accordion_context.id}__trigger`}
      class={clsx("accordion__trigger", class_attribute, className)}
      aria-expanded={accordion_context?.is_expanded ?? false}
      aria-controls={accordion_context?.id && `${accordion_context.id}__panel`}
      disabled={accordion_context?.is_interactive !== true || disabled}
    >
      {children}
      <IconComponent />
    </button>
  );
};

export default AccordionTrigger;
