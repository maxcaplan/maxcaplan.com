import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import type { HomeHeaderSubtitleComponent } from "./Subtitle";
import HomeHeaderSubtitle from "./Subtitle";
import type { HomeHeaderTitleComponent } from "./Title";
import HomeHeaderTitle from "./Title";

export interface HomeHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface HomeHeaderComponent {
  (props: HomeHeaderProps): JSX.Element;
  Title: HomeHeaderTitleComponent;
  Subtitle: HomeHeaderSubtitleComponent;
}

/** Home page section header wrapper */
const HomeHeader: HomeHeaderComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("home-header", class_attribute, className)}
    />
  );
};

HomeHeader.Title = HomeHeaderTitle;
HomeHeader.Subtitle = HomeHeaderSubtitle;

export default HomeHeader;
