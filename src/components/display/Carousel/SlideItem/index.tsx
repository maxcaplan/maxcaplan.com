import "./styles.scss";

import clsx from "clsx";
import type { ComponentChildren, JSX, LiHTMLAttributes } from "preact";
import { useContext, useMemo } from "preact/hooks";
import CarouselContext from "../context";

type ChildrenCallback = (slide: {
  index: number;
  is_current: boolean;
  is_previous: boolean;
  is_next: boolean;
}) => ComponentChildren;

export interface CarouselSlideItemProps extends Omit<
  LiHTMLAttributes<HTMLLIElement>,
  "role" | "aria-roledescription" | "children"
> {
  index?: number;
  "total-slides"?: number;
  children?: ComponentChildren | ChildrenCallback;
}

export type CarouselSlideItemComponent = (
  props: CarouselSlideItemProps,
) => JSX.Element;

/** An individual carousel slide */
const CarouselSlideItem: CarouselSlideItemComponent = (props) => {
  const {
    class: class_attribute,
    className,
    "aria-hidden": aria_hidden,
    index,
    "total-slides": total_slides,
    inert,
    ...attributes
  } = props;

  const carousel_context = useContext(CarouselContext);

  const is_current = useMemo(
    () =>
      carousel_context !== null &&
      carousel_context.is_interactive &&
      carousel_context.current_slide_index === index,
    [carousel_context],
  );

  const is_previous = useMemo(
    () =>
      carousel_context !== null &&
      carousel_context.is_interactive &&
      carousel_context.previous_slide_index === index,
    [carousel_context],
  );

  const is_next = useMemo(
    () =>
      carousel_context !== null &&
      carousel_context.is_interactive &&
      carousel_context.next_slide_index === index,
    [carousel_context],
  );

  const children = useMemo<ComponentChildren>(
    () =>
      typeof props.children === "function"
        ? props.children({
            index: index ?? 0,
            is_current,
            is_previous,
            is_next,
          })
        : props.children,
    [props.children, index, is_current, is_previous, is_next],
  );

  return (
    <li
      {...attributes}
      aria-roledescription="slide"
      aria-hidden={
        carousel_context?.is_interactive
          ? aria_hidden === true ||
            carousel_context.current_slide_index !== index
          : aria_hidden
      }
      inert={
        carousel_context?.is_interactive
          ? inert === true || carousel_context.current_slide_index !== index
          : inert
      }
      class={clsx(
        "carousel__slide-item",
        is_current && "carousel__slide-item--current",
        is_next && "carousel__slide-item--next",
        is_previous && "carousel__slide-item--previous",
        class_attribute,
        className,
      )}
    >
      {children}
    </li>
  );
};

export default CarouselSlideItem;
