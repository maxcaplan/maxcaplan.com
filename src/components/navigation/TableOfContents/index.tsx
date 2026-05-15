import "./styles.scss";

import NavMenu, { type NavMenuProps } from "@/components/navigation/NavMenu";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type {
  TableOfContentsHeading,
  WithHTMLElement,
  WithSubheadings,
} from "./types";
import TableOfContentsItem, { type TableOfContentsItemComponent } from "./Item";
import type { ComponentChild, JSX } from "preact";

export type TableOfContentsChildrenCallback = (
  heading: WithSubheadings<TableOfContentsHeading>,
) => ComponentChild;

export interface TableOfContentsProps extends Omit<
  NavMenuProps,
  "ordered" | "current" | "children"
> {
  "title-heading"?: TableOfContentsHeading;
  headings: TableOfContentsHeading[];
  children?: TableOfContentsChildrenCallback;
}

export interface TableOfContentsComponent {
  (props: TableOfContentsProps): JSX.Element;
  Item: TableOfContentsItemComponent;
}

const useHeadingsMap = (headings: WithSubheadings<TableOfContentsHeading>[]) =>
  useMemo(() => {
    const pushSubheading = (
      heading: WithSubheadings<TableOfContentsHeading>,
      subheading: WithSubheadings<TableOfContentsHeading>,
    ): void => {
      // Create new subheading array if heading doesn't have one
      if (
        heading.subheadings === undefined ||
        heading.subheadings.length <= 0
      ) {
        heading.subheadings = [subheading];
        return;
      }

      const last_subheading =
        heading.subheadings[heading.subheadings.length - 1];

      // If subheading is the same depth as previous subheadings, add to array
      if ((last_subheading.depth ?? 1) >= (subheading.depth ?? 1)) {
        heading.subheadings.push(subheading);
        return;
      }

      // Go to next subheading depth
      pushSubheading(last_subheading, subheading);
    };

    return structuredClone(headings).reduce<
      WithSubheadings<TableOfContentsHeading>[]
    >((headings_map, heading) => {
      if (headings_map.length <= 0) {
        headings_map.push(heading);
        return headings_map;
      }

      const previous_heading = headings_map[headings_map.length - 1];

      if ((previous_heading.depth ?? 1) >= (heading.depth ?? 1)) {
        headings_map.push(heading);
      } else {
        pushSubheading(previous_heading, heading);
      }

      return headings_map;
    }, []);
  }, []);

/** Navigation menu for a list of page headings */
const TableOfContents: TableOfContentsComponent = (props) => {
  const {
    "title-heading": title_heading,
    headings,
    class: class_attribute,
    className,
    children,
    "aria-label": aria_label,
    direction,
    ...nav_menu_props
  } = props;

  const [is_visible, setIsVisible] = useState(false);
  const [current_heading, setCurrentHeading] = useState<
    TableOfContentsHeading | undefined
  >(undefined);

  const menu_element_ref = useRef<HTMLElement>(null);
  const is_menu_visible = useRef(false);
  const heading_elements_ref =
    useRef<WithHTMLElement<TableOfContentsHeading>[]>(null);

  const headings_map = useHeadingsMap(headings);

  /** Get HTML elements for a list of menu anchors */
  const getHeadingElements = (heading: TableOfContentsHeading[]) =>
    heading.map<WithHTMLElement<TableOfContentsHeading>>((heading) => {
      return {
        ...heading,
        element:
          !import.meta.env.SSR && heading.slug
            ? document.getElementById(heading.slug)
            : null,
      };
    });

  /** Get the current heading element based on element scroll positions */
  const getCurrentHeading = (
    headings?: WithHTMLElement<TableOfContentsHeading>[] | null,
  ): WithHTMLElement<TableOfContentsHeading> | undefined => {
    // Skip if there are no heading elements or menu is not visible
    if (!headings || !is_menu_visible.current) {
      return;
    }

    const window_height = window.innerHeight;

    // Get last heading that is above the bottom edge of the window
    return headings.findLast((heading) => {
      const heading_rect = heading.element?.getBoundingClientRect();

      return (
        heading_rect && window_height > heading_rect.y + heading_rect.height / 2
      );
    });
  };

  /** Window scroll event handler */
  const onWindowScroll = () => {
    setCurrentHeading(getCurrentHeading(heading_elements_ref.current));
  };

  /** Intersection observer callback */
  const handleIntersection: IntersectionObserverCallback = (entries) => {
    is_menu_visible.current = entries.at(0)?.isIntersecting ?? false;
    setIsVisible(is_menu_visible.current);
  };

  // Init event listeners and intersection observer on mount
  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);

    const observer = new IntersectionObserver(handleIntersection);

    if (menu_element_ref.current !== null) {
      observer.observe(
        menu_element_ref.current instanceof HTMLElement
          ? menu_element_ref.current
          : /** @ts-ignore current can be a VNode instead of an element. In that case use `current.base` */
            menu_element_ref.current.base,
      );
    }

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      observer.disconnect();
    };
  }, []);

  // Get heading elements and set current heading when heading prop changes
  useEffect(() => {
    const heading_elements = getHeadingElements(headings);
    heading_elements_ref.current = heading_elements;
    setCurrentHeading(getCurrentHeading(heading_elements));
  }, [headings]);

  // Update current heading when menu visibility changes
  useEffect(() => {
    if (is_visible) {
      setCurrentHeading(getCurrentHeading(heading_elements_ref.current));
    }
  }, [is_visible]);

  return (
    <NavMenu
      {...nav_menu_props}
      class={clsx("table-of-contents", class_attribute, className)}
      ref={menu_element_ref}
      aria-label={aria_label ?? "Table of contents"}
      direction={direction ?? "column"}
      ordered
      current={!!current_heading?.slug ? `#${current_heading.slug}` : "#"}
    >
      {title_heading &&
        (children !== undefined ? (
          children({
            ...title_heading,
            slug: title_heading.slug ?? "",
            depth: title_heading.depth ?? 1,
          })
        ) : (
          <TableOfContentsItem
            heading={{
              ...title_heading,
              slug: title_heading.slug ?? "",
              depth: title_heading.depth ?? 1,
            }}
          />
        ))}

      {headings_map.map((heading) =>
        children !== undefined ? (
          children(heading)
        ) : (
          <TableOfContentsItem heading={heading} />
        ),
      )}
    </NavMenu>
  );
};

TableOfContents.Item = TableOfContentsItem;

export default TableOfContents;
