import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export type CardBodyComponent = (props: CardBodyProps) => JSX.Element;

/** Body of a card component */
const CardBody: CardBodyComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("card__body", class_attribute, className, props.class)}
    />
  );
};

export default CardBody;
