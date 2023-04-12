import { createPortal } from "react-dom";
import SnackbarProvider from "./SnackbarProvider";
import { useSnackbar } from "./snackbar.reducer";
import SnackbarMessage from "./SnackbarMessage";
import clsx from "clsx";

interface SnackbarProps {
  position?: keyof typeof positions;
}
export default function Snackbar({ position = "bottom" }: SnackbarProps) {
  const { queue, removeSnackbar } = useSnackbar();

  return createPortal(
    <div
      className={clsx(
        "fixed z-15 bottom-5 flex justify-center items-center",
        positions[position]
      )}
    >
      {queue.map((item, index) => (
        <SnackbarMessage
          dismissable
          key={index}
          message={item.message}
          duration={item.duration}
          onDismiss={() => removeSnackbar(item)}
        ></SnackbarMessage>
      ))}
    </div>,
    document.body
  );
}

const positions = {
  top: "top-5",
  bottom: "bottom-5",
  left: "left-5",
  right: "right-5",
};
