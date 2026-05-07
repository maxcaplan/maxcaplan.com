import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";

export interface HomeNavContentProps extends HTMLAttributes<HTMLDivElement> {}

export type HomeNavContentComponent = (
  props: HomeNavContentProps,
) => JSX.Element;

/** Content wrapper component for home navigation menu layout */
const HomeNavContent: HomeNavContentComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("home-nav__content", class_attribute, className)}
    />
  );
};

export default HomeNavContent;
