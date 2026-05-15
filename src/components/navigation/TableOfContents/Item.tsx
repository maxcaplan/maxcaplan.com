import clsx from "clsx";
import NavMenu from "../NavMenu";
import type { TableOfContentsHeading, WithSubheadings } from "./types";
import type { NavMenuItemProps } from "../NavMenu/Item";
import type { JSX } from "preact";

export interface TableOfContentsItemProps extends NavMenuItemProps {
  heading: WithSubheadings<TableOfContentsHeading>;
}

export type TableOfContentsItemComponent = (
  props: TableOfContentsItemProps,
) => JSX.Element;

/** Table of contents menu item */
const TableOfContentsItem: TableOfContentsItemComponent = (props) => {
  const {
    heading,
    class: class_attribute,
    className,
    children,
    ...nav_menu_item_props
  } = props;

  return (
    <NavMenu.Item
      {...nav_menu_item_props}
      class={clsx("table-of-contents__item", class_attribute, className)}
    >
      {!!children ? (
        children
      ) : (
        <NavMenu.Link
          class={clsx(
            "table-of-contents__link",
            props.heading.depth &&
              `table-of-contents__link--depth-${props.heading.depth}`,
          )}
          href={
            props.heading.slug !== undefined
              ? `#${props.heading.slug}`
              : undefined
          }
          current-value={true}
        >
          {props.heading.text}
        </NavMenu.Link>
      )}

      {props.heading.subheadings && (
        <ol class="table-of-contents__sublist">
          {props.heading.subheadings.map((subheading) => (
            <TableOfContentsItem heading={subheading} />
          ))}
        </ol>
      )}
    </NavMenu.Item>
  );
};

export default TableOfContentsItem;
