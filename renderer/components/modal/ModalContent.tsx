import { motion } from "framer-motion";
import { useModalContext } from "./context";
import { useEffect } from "react";

interface ModalContentProps {
  children: React.ReactNode;
  title: string;
}
export default function ModalContent({
  title,
  children,
}: ModalContentProps): JSX.Element {
  const { onOpen } = useModalContext();

  useEffect(() => {
    onOpen?.();
  }, [onOpen]);

  return (
    <motion.div
      initial={{ scale: 0.2 }}
      whileInView={{ scale: 1 }}
      exit={{ scale: 0.2 }}
      className="p-5 bg-slate-50 dark:bg-slate-800 shadow-xl rounded-xl text-black relative flex flex-col gap-6 text-sm"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="text-sm text-center font-bold dark:text-white">{title}</h1>
      {children}
    </motion.div>
  );
}
