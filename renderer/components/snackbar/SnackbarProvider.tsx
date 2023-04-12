import React, { useCallback, useState } from "react";
import { SnackbarContext } from "./snackbar.context";
import { useSnackbar } from "./snackbar.reducer";
import Snackbar from "./Snackbar";

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  const value = useSnackbar();

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
}
