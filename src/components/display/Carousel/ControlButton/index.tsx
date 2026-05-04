import clsx from "clsx";
import type { JSX, TargetedMouseEvent } from "preact";
import { useContext, useMemo } from "preact/hooks";
import type { ButtonProps } from "@/components/input/Button";
import Button from "@/components/input/Button";
import CarouselContext from "../context";

type CarouselControlButtonDirection = "previous" | "next";

interface CarouselControlButtonProps extends Omit<
  ButtonProps,
  "href" | "target"
> {
  direction: CarouselControlButtonDirection;
}

export type CarouselControlButtonComponent = (
  props: CarouselControlButtonProps,
) => JSX.Element;

/** Button control for changing to the next or previous slide in a carousel */
const CarouselControlButton: CarouselControlButtonComponent = (props) => {
  const {
    class: class_attribute,
    className,
    direction,
    onClick,
    disabled,
    ...attributes
  } = props;

  const carousel_context = useContext(CarouselContext);

  const is_disabled = useMemo(
    () =>
      carousel_context
        ? !carousel_context.is_interactive ||
          (direction === "previous"
            ? carousel_context.previousSlide === undefined
            : carousel_context.nextSlide === undefined) ||
          disabled === true
        : disabled,
    [
      carousel_context?.is_interactive,
      carousel_context?.previousSlide,
      carousel_context?.nextSlide,
      direction,
      disabled,
    ],
  );

  /** Control button click event handler */
  const onControlButtonClick = (
    event: TargetedMouseEvent<HTMLButtonElement> &
      TargetedMouseEvent<HTMLAnchorElement>,
  ) => {
    onClick?.(event);

    if (carousel_context !== null) {
      direction === "previous"
        ? carousel_context.previousSlide()
        : carousel_context.nextSlide();
    }
  };

  return (
    <Button
      {...attributes}
      class={clsx("carousel__control-button", class_attribute, className)}
      disabled={is_disabled}
      onClick={onControlButtonClick}
    />
  );
};

export default CarouselControlButton;
