import clsx from "clsx";
import type { JSX } from "preact";
import Heading, {
  type HeadingLevel,
  type HeadingProps,
} from "@/components/display/Heading";

export interface HomeHeaderTitleProps extends Omit<HeadingProps, "level"> {
  level?: HeadingLevel;
}

export interface HomeHeaderTitleComponent {
  (props: HomeHeaderTitleProps): JSX.Element;
}

/** Home page section header title */
const HomeHeaderTitle: HomeHeaderTitleComponent = (props) => {
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
      level={level ?? 2}
      type={type ?? "display-2"}
      class={clsx("home-header__title", class_attribute, className)}
    />
  );
};

export default HomeHeaderTitle;
