import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import { useContext } from "preact/hooks";
import CarouselContext from "../context";

interface CarouselControlsProps extends HTMLAttributes<HTMLUListElement> {}

export type CarouselControlsComponent = (
  props: CarouselControlsProps,
) => JSX.Element;

/** Carousel controls wrapper */
const CarouselControls: CarouselControlsComponent = (props) => {
  const {
    class: class_attribute,
    className,
    "aria-hidden": aria_hidden,
    ...attributes
  } = props;

  const carousel_context = useContext(CarouselContext);

  return (
    <ul
      {...attributes}
      aria-hidden={!carousel_context?.is_interactive ? false : aria_hidden}
      class={clsx("carousel__controls", class_attribute, className)}
    />
  );
};

export default CarouselControls;
