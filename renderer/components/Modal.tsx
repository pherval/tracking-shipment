import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";

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

  if (!show) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      {createPortal(
        <div
          className="w-full h-full z-50 fixed top-0 flex items-center justify-center inset-0 backdrop-blur-sm bg-black bg-opacity-10"
          onClick={handleClick}
        >
          {children}
        </div>,
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
    <div
      className="p-5 bg-white shadow-xl rounded-xl text-black relative flex flex-col gap-6 text-sm"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="text-sm text-center font-bold">{title}</h1>
      {children}
    </div>
  );
}
