import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import { useContext } from "preact/hooks";
import AccordionContext from "../context";

export interface AccordionPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "role" | "id" | "aria-label" | "aria-labelledby" | "aria-hidden"
> {}

export type AccordionPanelComponent = (
  props: AccordionPanelProps,
) => JSX.Element;

const AccordionPanel: AccordionPanelComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  const accordion_context = useContext(AccordionContext);

  return (
    <div
      {...attributes}
      id={accordion_context?.id && `${accordion_context.id}__panel`}
      aria-labelledby={
        accordion_context?.id && `${accordion_context.id}__trigger`
      }
      aria-hidden={accordion_context?.is_expanded !== true}
      class={clsx("accordion__panel", class_attribute, className)}
      role="region"
    />
  );
};

export default AccordionPanel;
