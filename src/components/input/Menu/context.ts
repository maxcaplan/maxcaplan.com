import { createContext } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

export interface MenuContextValue {
  is_expanded: boolean;
  setIsExpanded: Dispatch<StateUpdater<boolean>>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export default MenuContext;
