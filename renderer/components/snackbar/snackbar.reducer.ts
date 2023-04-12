import { useCallback, useContext, useReducer } from "react";
import { SnackbarContext } from "./snackbar.context";

type SnackbarMessage = {
  message: string;
  duration?: number;
};

type SnackbarState = {
  queue: SnackbarMessage[];
};

type Action =
  | { type: "SHOW_SNACKBAR"; payload: SnackbarMessage }
  | { type: "REMOVE_SNACKBAR"; payload: SnackbarMessage };

function dispatcher(state: SnackbarState, action: Action): SnackbarState {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return {
        ...state,
        queue: state.queue.concat(action.payload),
      };
    case "REMOVE_SNACKBAR":
      return {
        ...state,
        queue: state.queue.filter((message) => message !== action.payload),
      };
    default:
      return state;
  }
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}

export function useSnackbar() {
  const [state, dispatch] = useReducer(dispatcher, {
    queue: [],
  });

  const showSnackbar = useCallback(
    (message: string, duration?: number) => {
      dispatch({
        type: "SHOW_SNACKBAR",
        payload: {
          message,
          duration,
        },
      });
    },
    [dispatch]
  );

  const removeSnackbar = useCallback(
    (snackbar: SnackbarMessage) => {
      dispatch({
        type: "REMOVE_SNACKBAR",
        payload: snackbar,
      });
    },
    [dispatch]
  );

  return {
    queue: state.queue,
    showSnackbar,
    removeSnackbar,
  };
}
