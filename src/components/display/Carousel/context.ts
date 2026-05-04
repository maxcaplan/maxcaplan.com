import { createContext } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";
import type {
  GoToSlideCallback,
  NextSlideCallback,
  PreviousSlideCallback,
} from "./types";

export interface CarouselContextValue {
  is_interactive: boolean;
  total_slides: number;
  current_slide_index: number;
  previous_slide_index: number;
  next_slide_index: number;
  scroll_to_slide_index: number | undefined;
  scroll_between_slides: number;
  setTotalSlides: Dispatch<StateUpdater<number>>;
  setCurrentSlideIndex: Dispatch<StateUpdater<number>>;
  setScrollBetweenSlides: Dispatch<StateUpdater<number>>;
  goToSlide: GoToSlideCallback;
  previousSlide: PreviousSlideCallback;
  nextSlide: NextSlideCallback;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

export default CarouselContext;
