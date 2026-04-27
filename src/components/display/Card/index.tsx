import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import type { CardBodyComponent } from "./Body";
import CardBody from "./Body";
import type { CardFooterComponent } from "./Footer";
import CardFooter from "./Footer";
import type { CardHeaderComponent } from "./Header";
import CardHeader from "./Header";

interface CardProps extends HTMLAttributes<HTMLElement> {}

interface CardComponent {
  (props: CardProps): JSX.Element;
  Header: CardHeaderComponent;
  Body: CardBodyComponent;
  Footer: CardFooterComponent;
}

/** Display data in a card format */
const Card: CardComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <section
      {...attributes}
      class={clsx("card", class_attribute, className, props.class)}
    />
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
