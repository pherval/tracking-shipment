import { createContext } from "react";
import { useSelect } from "../../hooks";

type MasterDetailsContextValue = ReturnType<typeof useSelect>;

export const MasterDetailsContext =
  createContext<MasterDetailsContextValue | null>(null);
