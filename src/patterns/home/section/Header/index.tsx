import "./styles.scss";

import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import type { HomeSectionHeaderSubtitleComponent } from "./Subtitle";
import HomeSectionHeaderSubtitle from "./Subtitle";
import type { HomeSectionHeaderTitleComponent } from "./Title";
import HomeSectionHeaderTitle from "./Title";

export interface HomeSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface HomeSectionHeaderComponent {
  (props: HomeSectionHeaderProps): JSX.Element;
  Title: HomeSectionHeaderTitleComponent;
  Subtitle: HomeSectionHeaderSubtitleComponent;
}

/** Home page section header wrapper */
const HomeSectionHeader: HomeSectionHeaderComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <div
      {...attributes}
      class={clsx("home-section-header", class_attribute, className)}
    />
  );
};

HomeSectionHeader.Title = HomeSectionHeaderTitle;
HomeSectionHeader.Subtitle = HomeSectionHeaderSubtitle;

export default HomeSectionHeader;
