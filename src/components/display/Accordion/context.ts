import { createContext } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

export interface AccordionContextValue {
  id: string;
  is_interactive: boolean;
  is_expanded: boolean;
  setIsExpanded: Dispatch<StateUpdater<boolean>>;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export default AccordionContext;
