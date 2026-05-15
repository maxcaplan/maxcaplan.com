import "./styles.scss";

import clsx from "clsx";
import { Home } from "maxcaplan-icons";
import type { JSX } from "preact";
import NavMenu from "@/components/navigation/NavMenu";
import type { NavMenuLinkProps } from "@/components/navigation/NavMenu/Link";
import BreadcrumbItem, { type BreadcrumbItemProps } from "../Item";

export interface BreadcrumbHomeItemProps extends Omit<
  BreadcrumbItemProps,
  "children" | "current" | "href"
> {}

export type BreadcrumbHomeItemComponent = (
  props: BreadcrumbHomeItemProps,
) => JSX.Element;

/** Breadcrumb navigation link item */
const BreadcrumbHomeItem: BreadcrumbHomeItemComponent = (props) => {
  const { class: class_attribute, className, ...attributes } = props;

  return (
    <BreadcrumbItem
      class={clsx("breadcrumb__item--home", class_attribute, className)}
      href="/"
    >
      <Home class="breadcrumb__item-icon--home" width={20} height={20} />
      <span class="visually-hidden">Go to homepage</span>
    </BreadcrumbItem>
  );
};

export default BreadcrumbHomeItem;
