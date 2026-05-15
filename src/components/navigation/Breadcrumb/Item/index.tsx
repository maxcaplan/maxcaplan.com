import "./styles.scss";

import clsx from "clsx";
import { CaretAltRight } from "maxcaplan-icons";
import type { JSX } from "preact";
import NavMenu from "@/components/navigation/NavMenu";
import type { NavMenuLinkProps } from "@/components/navigation/NavMenu/Link";

export interface BreadcrumbItemProps extends NavMenuLinkProps {}

export type BreadcrumbItemComponent = (
  props: BreadcrumbItemProps,
) => JSX.Element;

/** Breadcrumb navigation link item */
const BreadcrumbItem: BreadcrumbItemComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <NavMenu.Item class={clsx("breadcrumb__item", class_attribute, className)}>
      <NavMenu.Link {...attributes} class="breadcrumb__link" />
      <CaretAltRight class="breadcrumb__seperator" width={20} height={20} />
    </NavMenu.Item>
  );
};

export default BreadcrumbItem;
