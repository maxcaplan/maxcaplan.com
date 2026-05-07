import "./styles.scss";

import clsx from "clsx";
import { CaretAltRight } from "maxcaplan-icons";
import type { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { NavMenuProps } from "@/components/navigation/NavMenu";
import NavMenu from "@/components/navigation/NavMenu";

export type HomeNavMenuAnchor = { name: string; id: string };

export interface HomeNavMenuProps extends Omit<
  NavMenuProps,
  "current" | "ordered" | "aria-label" | "aria-labelledby" | "children"
> {
  anchors: HomeNavMenuAnchor[];
}

export type HomeNavMenuComponent = (props: HomeNavMenuProps) => JSX.Element;

type WithElement<T> = T & { element: HTMLElement | null };

/** Home page navigation menu */
const HomeNavMenu: HomeNavMenuComponent = (props) => {
  const {
    class: class_attribute,
    className,
    anchors,
    ...nav_menu_props
  } = props;

  const [is_visible, setIsVisible] = useState(false);
  const [current_anchor, setCurrentAnchor] = useState<
    HomeNavMenuAnchor | undefined
  >(undefined);

  const menu_element_ref = useRef<HTMLElement>(null);
  const is_menu_visible = useRef(false);
  const anchor_elements_ref = useRef<WithElement<HomeNavMenuAnchor>[]>(null);

  /** Get HTML elements for a list of menu anchors */
  const getAnchorElements = (anchors: HomeNavMenuAnchor[]) =>
    anchors.map<WithElement<HomeNavMenuAnchor>>((anchor) => {
      return {
        ...anchor,
        element: !import.meta.env.SSR
          ? document.getElementById(anchor.id)
          : null,
      };
    });

  /** Get the current anchor element based on element positions */
  const getCurrentAnchor = (
    anchor_elements?: WithElement<HomeNavMenuAnchor>[] | null,
  ): WithElement<HomeNavMenuAnchor> | undefined => {
    // Skip if there are no anchor elements or menu is not visible
    if (!anchor_elements || !is_menu_visible.current) {
      return;
    }

    const window_height = window.innerHeight;

    // Get last anchor that is above the bottom edge of the window
    return anchor_elements.findLast((anchor) => {
      const anchor_rect = anchor.element?.getBoundingClientRect();

      return (
        anchor_rect && window_height > anchor_rect.y + anchor_rect.height / 2
      );
    });
  };

  /** Window scroll event handler */
  const onWindowScroll = () => {
    setCurrentAnchor(getCurrentAnchor(anchor_elements_ref.current));
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
          : /** @ts-ignore current can be a VNode instead of an element. In that case use current.base */
            menu_element_ref.current.base,
      );
    }

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      observer.disconnect();
    };
  }, []);

  // Get anchor elements and set current anchor when anchor prop changes
  useEffect(() => {
    const anchor_elements = getAnchorElements(anchors);
    anchor_elements_ref.current = anchor_elements;
    setCurrentAnchor(getCurrentAnchor(anchor_elements));
  }, [anchors]);

  // Update current anchor when menu visibility changes
  useEffect(() => {
    if (is_visible) {
      setCurrentAnchor(getCurrentAnchor(anchor_elements_ref.current));
    }
  }, [is_visible]);

  return (
    <NavMenu
      {...nav_menu_props}
      ref={menu_element_ref}
      class={clsx("home-nav__menu", class_attribute, className)}
      aria-label="Table of Contents"
      ordered
      direction={props.direction ?? "column"}
      current={!!current_anchor?.id ? `#${current_anchor.id}` : undefined}
    >
      {anchors.map(({ name, id }) => (
        <NavMenu.Item class="home-nav__menu-item">
          <NavMenu.Link href={`#${id}`}>{name}</NavMenu.Link>
        </NavMenu.Item>
      ))}
    </NavMenu>
  );
};

export default HomeNavMenu;
