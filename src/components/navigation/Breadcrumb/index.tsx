import "./styles.scss";

import clsx from "clsx";
import { type JSX } from "preact";
import NavMenu, { type NavMenuProps } from "@/components/navigation/NavMenu";
import type { BreadcrumbHomeItemComponent } from "./Home";
import BreadcrumbHomeItem from "./Home";
import type { BreadcrumbItemComponent } from "./Item";
import BreadcrumbItem from "./Item";

export interface BreadcrumbProps extends Omit<
  NavMenuProps,
  "direction" | "ordered" | "wrap"
> {}

export interface BreadcrumbComponent {
  (props: BreadcrumbProps): JSX.Element;
  Item: BreadcrumbItemComponent;
  Home: BreadcrumbHomeItemComponent;
}

/** Hierarchical list of parent page links */
const Breadcrumb: BreadcrumbComponent = (props) => {
  const {
    class: class_attribute,
    className,
    children,
    "aria-label": aria_label,
    ...attributes
  } = props;

  return (
    <NavMenu
      {...attributes}
      class={clsx("breadcrumb", class_attribute, className)}
      aria-label={
        !aria_label && !props["aria-labelledby"] ? "breadcrumb" : aria_label
      }
      direction="row"
      ordered
      wrap
    >
      {children}
    </NavMenu>
  );
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Home = BreadcrumbHomeItem;

export default Breadcrumb;
