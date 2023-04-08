import { motion } from "framer-motion";
import { MouseEventHandler, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { useShortcut } from "../hooks/use-shortcut";

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}
const ModalContext = createContext<Partial<ModalProps> | null>(null);

export default function Modal({
  show,
  children,
  onClose,
}: ModalProps): JSX.Element | null {
  const handleClick: MouseEventHandler = (e) => {
    onClose?.();
  };

  useShortcut(() => onClose?.(), {
    shortcut: {
      code: "Escape",
    },
  });

  if (!show) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      {createPortal(
        <motion.div
          className="w-full h-full z-50 fixed top-0 flex items-center justify-center inset-0 backdrop-blur-sm bg-black bg-opacity-10"
          onClick={handleClick}
        >
          {children}
        </motion.div>,
        document.body
      )}
    </ModalContext.Provider>
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  title: string;
}
export function ModalContent({
  title,
  children,
}: ModalContentProps): JSX.Element {
  const context = useContext(ModalContext);

  if (!context) throw new Error("ModalContent ");

  return (
    <motion.div
      initial={{ scale: 0.2 }}
      whileInView={{ scale: 1 }}
      exit={{ scale: 0.2 }}
      className="p-5 bg-white shadow-xl rounded-xl text-black relative flex flex-col gap-6 text-sm"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="text-sm text-center font-bold">{title}</h1>
      {children}
    </motion.div>
  );
}
