import { ModalContext } from "./context";

interface ModalProviderProps {
  onClose?: () => void;
  onOpen?: () => void;
  show: boolean;
  children: React.ReactNode;
}
export default function ModalProvider({
  onClose,
  onOpen,
  show,
  children,
}: ModalProviderProps) {
  return (
    <ModalContext.Provider value={{ onClose, onOpen, show }}>
      {children}
    </ModalContext.Provider>
  );
}
