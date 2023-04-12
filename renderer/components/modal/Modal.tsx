import { motion } from "framer-motion";
import { MouseEventHandler, createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { useShortcut } from "../../hooks/use-shortcut";
import { ModalContext } from "./context";
import ModalContent from "./ModalContent";

interface ModalProps {
  show: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
}

function Modal({
  show,
  children,
  onClose,
  onOpen,
}: ModalProps): JSX.Element | null {
  const ref = useRef<HTMLDivElement | null>(null);
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
    <ModalContext.Provider value={{ onClose, onOpen, show }}>
      {createPortal(
        <motion.div
          ref={ref}
          className="w-full h-full z-50 fixed top-0 flex items-center justify-center inset-0 backdrop-blur-sm bg-black bg-opacity-50 dark:bg-slate-400 dark:bg-opacity-40"
          onClick={handleClick}
        >
          {children}
        </motion.div>,
        document.body
      )}
    </ModalContext.Provider>
  );
}

Modal.Content = ModalContent;

export default Modal;
