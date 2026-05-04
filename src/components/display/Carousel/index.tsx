import "./styles.scss";

import clsx from "clsx";
import {
  type BaseHTMLAttributes,
  type ComponentChildren,
  type JSX,
  toChildArray,
  type VNode,
} from "preact";
import { useEffect, useState } from "preact/hooks";
import type { CarouselControlButtonComponent } from "./ControlButton";
import CarouselControlButton from "./ControlButton";
import type { CarouselControlItemComponent } from "./ControlItem";
import CarouselControlItem from "./ControlItem";
import type { CarouselControlsComponent } from "./Controls";
import CarouselControls from "./Controls";
import CarouselContext from "./context";
import type { CarouselIndicatorComponent } from "./Indicator";
import CarouselIndicator from "./Indicator";
import type { CarouselSlideItemComponent } from "./SlideItem";
import CarouselSlideItem from "./SlideItem";
import type { CarouselSlidesComponent, CarouselSlidesProps } from "./Slides";
import CarouselSlides from "./Slides";
import {
  getNextSlideIndex,
  getPreviousSlideIndex,
  getTotalSlides,
} from "./util";

export interface CarouselProps extends Omit<
  BaseHTMLAttributes<HTMLElement>,
  "role" | "aria-roledescription"
> {}

export interface CarouselComponent {
  (props: CarouselProps): JSX.Element;
  Controls: CarouselControlsComponent;
  ControlItem: CarouselControlItemComponent;
  ControlButton: CarouselControlButtonComponent;
  Slides: CarouselSlidesComponent;
  SlideItem: CarouselSlideItemComponent;
  Indicator: CarouselIndicatorComponent;
}

/** Get carousel slides component from children */
const getSlidesComponent = (
  children: ComponentChildren,
): VNode<CarouselSlidesProps> | undefined => {
  const carousel_slides_child = toChildArray(children).find(
    (child) => typeof child === "object" && child.type === CarouselSlides,
  );

  return typeof carousel_slides_child !== "object"
    ? undefined
    : carousel_slides_child;
};

/** Display a collection of items that can be scrolled */
const Carousel: CarouselComponent = (props) => {
  const { class: class_attribute, className, children, ...attributes } = props;

  const [is_interactive, setIsInteractive] = useState(false);
  const [total_slides, setTotalSlides] = useState(
    getTotalSlides(getSlidesComponent(children)?.props.children),
  );
  const [current_slide_index, setCurrentSlideIndex] = useState(0);
  const [previous_slide_index, setPreviousSlideIndex] = useState(
    getPreviousSlideIndex(0, total_slides),
  );
  const [next_slide_index, setNextSlideIndex] = useState(
    getNextSlideIndex(0, total_slides),
  );
  const [scroll_to_slide_index, setScrollToSlideIndex] = useState<
    number | undefined
  >();
  const [live_region_slide_index, setLiveRegionSlideIndex] = useState<
    number | undefined
  >();

  /** Change to slide at an index */
  const goToSlide = (index: number) => {
    if (scroll_to_slide_index === undefined) {
      const slide_index = Math.min(Math.max(index, 0), total_slides - 1);
      setScrollToSlideIndex(slide_index);
      setLiveRegionSlideIndex(slide_index);
    }
  };

  /** Change to previous slide */
  const previousSlide = () => {
    if (scroll_to_slide_index === undefined) {
      const slide_index = previous_slide_index;
      setScrollToSlideIndex(slide_index);
      setLiveRegionSlideIndex(slide_index);
    }
  };

  /** Change to next slide */
  const nextSlide = () => {
    if (scroll_to_slide_index === undefined) {
      const slide_index = next_slide_index;
      setScrollToSlideIndex(slide_index);
      setLiveRegionSlideIndex(slide_index);
    }
  };

  // Set interactive state on load and unload
  useEffect(() => {
    setIsInteractive(true);
    return () => setIsInteractive(false);
  }, []);

  // Sync current, previous, next, and scroll to slide indices
  useEffect(() => {
    if (!is_interactive) {
      return;
    }

    if (current_slide_index === scroll_to_slide_index) {
      setScrollToSlideIndex(undefined);
    }

    setPreviousSlideIndex(
      getPreviousSlideIndex(current_slide_index, total_slides),
    );
    setNextSlideIndex(getNextSlideIndex(current_slide_index, total_slides));
  }, [
    is_interactive,
    current_slide_index,
    total_slides,
    scroll_to_slide_index,
  ]);

  return (
    <CarouselContext.Provider
      value={{
        is_interactive,
        total_slides,
        current_slide_index,
        previous_slide_index,
        next_slide_index,
        scroll_to_slide_index,
        setTotalSlides,
        setCurrentSlideIndex,
        goToSlide,
        previousSlide,
        nextSlide,
      }}
    >
      <section
        {...attributes}
        aria-roledescription="carousel"
        class={clsx(
          "carousel",
          is_interactive && "carousel--interactive",
          class_attribute,
          className,
        )}
      >
        {children}

        <div
          class="carousel__live-region visually-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {is_interactive && live_region_slide_index !== undefined
            ? `item ${live_region_slide_index + 1} of ${total_slides}`
            : undefined}
        </div>
      </section>
    </CarouselContext.Provider>
  );
};

Carousel.Controls = CarouselControls;
Carousel.ControlItem = CarouselControlItem;
Carousel.ControlButton = CarouselControlButton;
Carousel.Slides = CarouselSlides;
Carousel.SlideItem = CarouselSlideItem;
Carousel.Indicator = CarouselIndicator;

export default Carousel;
