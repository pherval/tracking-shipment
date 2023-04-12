import clsx from "clsx";
import SnackbarMessage from "./SnackbarMessage";
import { useSnackbar } from "./snackbar.reducer";

interface SnackbarProps {
  position?: keyof typeof positions;
}
export default function Snackbar({ position = "bottom" }: SnackbarProps) {
  const { queue, removeSnackbar } = useSnackbar();

  return (
    <div
      className={clsx(
        "fixed z-50 top-10 right-10 flex flex-col gap-2",
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
    </div>
  );
}

const positions = {
  top: "top-5",
  bottom: "bottom-5",
  left: "left-5",
  right: "right-5",
};
