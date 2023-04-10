import { useSelect } from "../../hooks";
import { MasterDetailsContext } from "./context";

export interface MasterDetailsProviderProps<T> {
  children: React.ReactNode;
}

export function MasterDetailsProvider<T>({
  children,
}: MasterDetailsProviderProps<T>) {
  const context = useSelect();

  return (
    <MasterDetailsContext.Provider value={context}>
      {children}
    </MasterDetailsContext.Provider>
  );
}
