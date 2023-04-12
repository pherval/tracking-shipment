import { createContext } from "react";
import { useSnackbarReducer } from "./snackbar.reducer";

type SnackbarContextType = ReturnType<typeof useSnackbarReducer>;

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
