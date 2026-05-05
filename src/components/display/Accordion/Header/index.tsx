import clsx from "clsx";
import type { JSX } from "preact";
import Heading, { type HeadingLevel, type HeadingProps } from "../../Heading";

export interface AccordionHeaderProps extends Omit<HeadingProps, "level"> {
  level?: HeadingLevel;
}

export type AccordionHeaderComponent = (
  props: AccordionHeaderProps,
) => JSX.Element;

const AccordionHeader: AccordionHeaderComponent = (props) => {
  const { class: class_attribute, className, level, ...attributes } = props;

  return (
    <Heading
      {...attributes}
      level={level ?? 3}
      class={clsx("accordion__header", class_attribute, className)}
    />
  );
};

export default AccordionHeader;
