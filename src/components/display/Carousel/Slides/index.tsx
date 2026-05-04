import "./styles.scss";

import clsx from "clsx";
import { type HTMLAttributes, type JSX } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import CarouselContext from "../context";
import { useCarouselSlides } from "../hooks";

export interface CarouselSlidesProps extends HTMLAttributes<HTMLUListElement> {}

export type CarouselSlidesComponent = (
  props: CarouselSlidesProps,
) => JSX.Element;

/** List of carousel slides */
const CarouselSlides: CarouselSlidesComponent = (props) => {
  const {
    class: class_attribute,
    className,
    children,
    onScroll,
    ...attributes
  } = props;

  const [slide_width, setSlideWidth] = useState(0);

  const carousel_context = useContext(CarouselContext);

  const { slides, total_slides, cloned_slides, slides_initialized } =
    useCarouselSlides(children, carousel_context);

  const element_ref = useRef<HTMLUListElement>(null);

  /** Get the width of a single slide item */
  const getSlideWidth = (resized?: boolean): number => {
    if (resized || slide_width === 0) {
      // Recalculate slide width
      const new_width =
        element_ref?.current?.querySelector<HTMLLIElement>(
          ".carousel__slide-item",
        )?.offsetWidth ?? 0;

      setSlideWidth(new_width);
      return new_width;
    }

    return slide_width;
  };

  /** Get the space between slide items */
  const getSpaceBetweenSlides = (): number => {
    if (element_ref.current === null) {
      return 0;
    }

    return Number(
      window
        .getComputedStyle(element_ref.current)
        .getPropertyValue("column-gap")
        .slice(0, -2),
    );
  };

  /** Scroll to a slide at a given index */
  const scrollToSlide = (index: number, instant?: boolean) => {
    if (element_ref.current === null) {
      return;
    }

    const current_index = carousel_context?.current_slide_index ?? 0;
    let scroll_to_index = index + 1;

    if (current_index - index > 1) {
      scroll_to_index = total_slides + 1;
    }

    if (current_index - index < -1) {
      scroll_to_index = 0;
    }

    element_ref.current.scrollTo({
      left: scroll_to_index * (getSlideWidth() + getSpaceBetweenSlides()),
      behavior: instant ? "instant" : "smooth",
    });
  };

  /** Window resize event handler */
  const handleWindowResize = () => {
    getSlideWidth(true);
    scrollToSlide(0, true);
  };

  /** Slides element scroll event handler */
  const handleSlidesScroll = () => {
    if (
      !slides_initialized ||
      !carousel_context?.is_interactive ||
      element_ref.current === null ||
      cloned_slides <= 0
    ) {
      return;
    }

    const scroll_value = element_ref.current.scrollLeft;
    const scroll_between_slides_value =
      (Math.round(
        (scroll_value / (getSlideWidth() + getSpaceBetweenSlides())) * 1000,
      ) /
        1000) %
      1;

    carousel_context.setScrollBetweenSlides(scroll_between_slides_value);

    if (scroll_value === 0) {
      // Loop from first slide to last
      element_ref.current.scrollTo({
        left: (getSlideWidth() + getSpaceBetweenSlides()) * total_slides,
        behavior: "instant",
      });
    }

    if (
      Math.ceil(scroll_value + element_ref.current.offsetWidth) >=
      element_ref.current.scrollWidth
    ) {
      // Loop from last slide to first
      element_ref.current.scrollTo({
        left: getSlideWidth() + getSpaceBetweenSlides(),
        behavior: "instant",
      });
    }

    // Get current slide index based on scroll position
    const slide_scroll_index =
      Math.round(scroll_value / (getSlideWidth() + getSpaceBetweenSlides())) -
      1;

    if (slide_scroll_index < 0) {
      // Wrap scrolling index to last slide
      carousel_context.setCurrentSlideIndex(total_slides - 1);
    } else if (slide_scroll_index >= total_slides) {
      // Wrap scrolling index to first slide
      carousel_context.setCurrentSlideIndex(0);
    } else {
      carousel_context.setCurrentSlideIndex(slide_scroll_index);
    }
  };

  // Setup window resize event handler
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Sync carousel context total slides value
  useEffect(
    () => carousel_context?.setTotalSlides(total_slides),
    [total_slides],
  );

  // Initialize slides scroll position
  useEffect(() => {
    if (
      !slides_initialized ||
      !carousel_context?.is_interactive ||
      element_ref.current === null
    ) {
      return;
    }

    scrollToSlide(0, true);
  }, [slides_initialized, carousel_context?.is_interactive]);

  // Scroll slides when scroll to index changed
  useEffect(() => {
    if (
      !slides_initialized ||
      !carousel_context?.is_interactive ||
      carousel_context?.scroll_to_slide_index === undefined ||
      element_ref.current === null
    ) {
      return;
    }

    scrollToSlide(carousel_context.scroll_to_slide_index);
  }, [
    slides_initialized,
    carousel_context?.is_interactive,
    carousel_context?.scroll_to_slide_index,
  ]);

  return (
    <ul
      {...attributes}
      onScroll={(event) => {
        handleSlidesScroll();
        onScroll?.(event);
      }}
      ref={element_ref}
      class={clsx("carousel__slides", class_attribute, className)}
    >
      {slides_initialized ? slides : children}
    </ul>
  );
};

export default CarouselSlides;
