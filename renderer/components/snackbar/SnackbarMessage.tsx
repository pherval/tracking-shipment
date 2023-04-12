import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useDebounce } from "../../hooks";
import { IconButton } from "../buttons";

interface SnackbarMessageProps {
  message?: string;
  dismissable?: boolean;
  duration?: number;
  onDismiss?: () => void;
}

export default function SnackbarMessage({
  message,
  dismissable,
  duration = 5_000,
  onDismiss,
}: SnackbarMessageProps) {
  useDebounce(
    null,
    () => {
      onDismiss?.();
    },
    duration
  );

  return (
    <motion.div
      variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -100 } }}
      initial="open"
      whileInView="closed"
      className="p-5 bg-slate-800 flex flex-col justify-between gap-5 text-white rounded-lg"
    >
      {message}
      {dismissable && (
        <IconButton onClick={onDismiss}>
          <AiOutlineClose></AiOutlineClose>
        </IconButton>
      )}
    </motion.div>
  );
}
