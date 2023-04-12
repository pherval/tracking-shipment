import { useContext } from "react";
import { SnackbarContext } from "./snackbar.context";

type SnackbarMessage = {
  message: string;
  duration?: number;
};

type SnackbarState = {
  queue: SnackbarMessage[];
};

type Action =
  | { type: "SHOW_SNACKBAR"; message: string; duration?: number }
  | { type: "HIDE_SNACKBAR" };

function dispatcher(state: SnackbarState, action: Action): SnackbarState {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return {
        ...state,
        message: action.message,
        duration: action.duration,
        visible: true,
      };
    case "HIDE_SNACKBAR":
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}
