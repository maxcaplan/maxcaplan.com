import {
  type ComponentChildren,
  cloneElement,
  toChildArray,
  type VNode,
} from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { CarouselContextValue } from "./context";

/** Dynamically manage slide item component children */
export const useCarouselSlides = (
  children?: ComponentChildren,
  context?: CarouselContextValue | null,
): {
  /** Slide item components */
  slides: ComponentChildren[];
  /** Total number of none-cloned slide items */
  total_slides: number;
  /** Total number of cloned slide items */
  cloned_slides: number;
  /** Whether slide items have been initialized */
  slides_initialized: boolean;
} => {
  const [slides_initialized, setSlidesInitialized] = useState(false);
  const [slides, setSlides] = useState<VNode[]>([]);
  const [cloned_slides, setClonedSlides] = useState(0);

  /** Create a clone of a slide item with it's index prop set */
  const initSlideElement = (
    vnode: VNode,
    index: number,
    is_clone?: boolean,
  ) => {
    return cloneElement(vnode, {
      index,
      "aria-hidden": is_clone || undefined,
      inert: is_clone || undefined,
      key: is_clone ? `${vnode.key}-clone` : vnode.key,
    });
  };

  // Get initialized slide elements
  const { slide_elements, total_slides } = useMemo(() => {
    const child_array = toChildArray(children);

    const total_slides = child_array.reduce<number>(
      (count, child) => (typeof child === "object" ? count + 1 : count),
      0,
    );

    /** Initialized slide components */
    const slide_elements = child_array.reduce<VNode[]>(
      (slide_elements, child, index) => {
        // Skip non node children
        if (typeof child !== "object") {
          return slide_elements;
        }

        // Set slide index
        slide_elements.push(initSlideElement(child, index));

        return slide_elements;
      },
      [],
    );

    return {
      slide_elements,
      total_slides,
    };
  }, [children, context?.is_interactive]);

  useEffect(() => {
    if (slide_elements.length <= 1) {
      setSlides(slide_elements);
    } else {
      // Clone first and last slide for looping
      setSlides([
        initSlideElement(
          slide_elements[slide_elements.length - 1],
          slide_elements.length - 1,
          true,
        ),
        ...slide_elements,
        initSlideElement(slide_elements[0], 0, true),
      ]);

      setClonedSlides(2);
    }

    if (!slides_initialized) {
      setSlidesInitialized(true);
    }
  }, [slide_elements]);

  return { slides, total_slides, slides_initialized, cloned_slides };
};
