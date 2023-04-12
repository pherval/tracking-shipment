import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose as CloseIcon } from "react-icons/io";
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
    <AnimatePresence>
      <motion.div
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: -100 },
        }}
        initial="closed"
        whileInView="open"
        exit="closed"
        className="p-2 bg-gray-700 text-sm flex justify-between gap-5 text-white rounded"
      >
        {message}
        {dismissable && (
          <IconButton theme="light" size="sm" onClick={onDismiss}>
            <CloseIcon></CloseIcon>
          </IconButton>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
