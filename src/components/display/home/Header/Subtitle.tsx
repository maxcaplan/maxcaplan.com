import clsx from "clsx";
import type { JSX } from "preact";
import Heading, {
  type HeadingLevel,
  type HeadingProps,
} from "@/components/display/Heading";

export interface HomeHeaderSubtitleProps extends Omit<HeadingProps, "level"> {
  level?: HeadingLevel;
}

export interface HomeHeaderSubtitleComponent {
  (props: HomeHeaderSubtitleProps): JSX.Element;
}

/** Home page section header subtitle */
const HomeHeaderSubtitle: HomeHeaderSubtitleComponent = (props) => {
  const {
    level,
    type,
    class: class_attribute,
    className,
    ...attributes
  } = props;

  return (
    <Heading
      {...attributes}
      level={level ?? 7}
      type={type ?? "subtitle-1"}
      class={clsx("home-header__subtitle", class_attribute, className)}
    />
  );
};

export default HomeHeaderSubtitle;
