import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export type CardHeaderComponent = (props: CardHeaderProps) => JSX.Element;

/** Header of a card component */
const CardHeader: CardHeaderComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("card__header", class_attribute, props.class)}
    />
  );
};

export default CardHeader;
