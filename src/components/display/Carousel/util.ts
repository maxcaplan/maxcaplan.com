import { type ComponentChildren, toChildArray } from "preact";
import CarouselSlideItem from "./SlideItem";

/** Get the index of the previous slide given the current slides index and total number of slides */
export const getPreviousSlideIndex = (
  current_index: number,
  total_slides: number,
): number => (current_index - 1 < 0 ? total_slides - 1 : current_index - 1);

/** Get the index of the next slide given the current slides index and total number of slides */
export const getNextSlideIndex = (
  current_index: number,
  total_slides: number,
): number => (current_index + 1 >= total_slides ? 0 : current_index + 1);

/** Get the total number of carousel slide items */
export const getTotalSlides = (children: ComponentChildren): number => {
  return toChildArray(children).reduce<number>(
    (count, child) =>
      typeof child === "object" && child.type === CarouselSlideItem
        ? count + 1
        : count,
    0,
  );
};
