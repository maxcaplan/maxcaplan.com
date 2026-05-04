import type { ComponentChildren, JSX } from "preact";
import { useContext } from "preact/hooks";
import CarouselContext from "../context";

type CarouselIndicatorChildrenCallback = (state: {
  /** Index of the current slide in the carousel */
  index: number;
  /** Total number of slides in the carousel */
  slides: number;
}) => ComponentChildren;

interface CarouselIndicatorProps {
  children?: CarouselIndicatorChildrenCallback;
}

export type CarouselIndicatorComponent = (
  props: CarouselIndicatorProps,
) => JSX.Element;

/** Carousel state indicator */
const CarouselIndicator: CarouselIndicatorComponent = (props) => {
  const carousel_context = useContext(CarouselContext);

  return (
    <>
      {props.children?.({
        index: carousel_context?.current_slide_index ?? 0,
        slides: carousel_context?.total_slides ?? 0,
      })}
    </>
  );
};

export default CarouselIndicator;
