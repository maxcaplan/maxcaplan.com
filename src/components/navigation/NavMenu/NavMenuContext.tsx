import { createContext } from "preact";

interface NavMenuContextValue {
  current?: string;
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

export default NavMenuContext;
