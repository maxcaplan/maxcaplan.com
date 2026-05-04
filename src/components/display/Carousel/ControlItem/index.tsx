import clsx from "clsx";
import type { JSX, LiHTMLAttributes } from "preact";

export interface CarouselControlItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export type CarouselControlItemComponent = (
  props: CarouselControlItemProps,
) => JSX.Element;

/** Carousel controls item */
const CarouselControlItem: CarouselControlItemComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <li
      {...attributes}
      class={clsx("carousel__control-item", class_attribute, className)}
    />
  );
};

export default CarouselControlItem;
