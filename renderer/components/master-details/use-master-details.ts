import { useContext } from "react";
import { MasterDetailsContext } from "./context";

export function useMasterDetails<T>(items: T[]) {
  const context = useContext<T>(MasterDetailsContext);

  if (!context) {
    throw new Error(
      "useMasterDetailsContext must be used within a MasterDetailsContext"
    );
  }

  context.setItems(items);

  return context;
}
