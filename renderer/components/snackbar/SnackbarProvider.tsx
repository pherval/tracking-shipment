import React, { useCallback, useState } from "react";
import { SnackbarContext } from "./snackbar.context";
import { useSnackbar } from "./snackbar.reducer";

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  const reducer = useSnackbar();

  return (
    <SnackbarContext.Provider value={reducer}>
      {children}
    </SnackbarContext.Provider>
  );
}
