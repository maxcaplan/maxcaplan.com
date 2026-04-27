import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export type CardFooterComponent = (props: CardFooterProps) => JSX.Element;

/** Footer of a card component */
const CardFooter: CardFooterComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("card__footer", class_attribute, className, props.class)}
    />
  );
};

export default CardFooter;
