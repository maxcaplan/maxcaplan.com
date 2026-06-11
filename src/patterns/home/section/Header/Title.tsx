import clsx from "clsx";
import type { JSX } from "preact";
import Heading, {
  type HeadingLevel,
  type HeadingProps,
} from "@/components/display/Heading";

export interface HomeSectionHeaderTitleProps extends Omit<
  HeadingProps,
  "level"
> {
  level?: HeadingLevel;
}

export interface HomeSectionHeaderTitleComponent {
  (props: HomeSectionHeaderTitleProps): JSX.Element;
}

/** Home page section header title */
const HomeSectionHeaderTitle: HomeSectionHeaderTitleComponent = (props) => {
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
      class={clsx("home-section-header__title", class_attribute, className)}
    />
  );
};

export default HomeSectionHeaderTitle;
