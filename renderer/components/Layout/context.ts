import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export const LayoutContext = createContext<{
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  toggleSideBar: () => void;
} | null>(null);

export function useLayoutContext() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayoutContext must be used within a Layout component");
  }

  return context;
}
