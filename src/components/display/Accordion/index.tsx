import clsx from "clsx";
import type { HTMLAttributes, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import AccordionContext from "./context";
import type { AccordionHeaderComponent } from "./Header";
import AccordionHeader from "./Header";
import type { AccordionPanelComponent } from "./Panel";
import AccordionPanel from "./Panel";
import type { AccordionTriggerComponent } from "./Trigger";
import AccordionTrigger from "./Trigger";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  "start-expanded"?: boolean;
}

export interface AccordionComponent {
  (props: AccordionProps): JSX.Element;
  Header: AccordionHeaderComponent;
  Trigger: AccordionTriggerComponent;
  Panel: AccordionPanelComponent;
}

const Accordion: AccordionComponent = (props) => {
  const {
    id,
    class: class_attribute,
    className,
    "start-expanded": start_expanded,
    ...attributes
  } = props;

  const [is_interactive, setIsInteractive] = useState(false);
  const [is_expanded, setIsExpanded] = useState(start_expanded ?? false);

  // Set interactive state when component loaded and unloaded
  useEffect(() => {
    setIsInteractive(true);

    return () => {
      setIsInteractive(false);
    };
  }, []);

  return (
    <AccordionContext.Provider
      value={{ id, is_interactive, is_expanded, setIsExpanded }}
    >
      <div
        {...attributes}
        id={id}
        class={clsx(
          "accordion",
          is_expanded && "accordion--expanded",
          class_attribute,
          className,
        )}
      />
    </AccordionContext.Provider>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Trigger = AccordionTrigger;
Accordion.Panel = AccordionPanel;

export default Accordion;
