import { createContext, useContext } from "react";

interface ModalContextValue {
  show: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalContext = createContext<Partial<ModalContextValue> | null>(
  null
);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalContext is not defined");
  }

  return context;
}
