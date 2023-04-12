import { createPortal } from "react-dom";
import SnackbarProvider from "./SnackbarProvider";
import { useSnackbar } from "./snackbar.reducer";

export default function Snackbar() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <SnackbarProvider>
      {createPortal(
        <div className="fixed z-15 bottom-0 flex justify-center items-center"></div>,
        document.body
      )}
      <div>Snackbar</div>
    </SnackbarProvider>
  );
}
