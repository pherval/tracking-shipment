import clsx from "clsx";
import { useState } from "react";
import styles from "./Layout.module.scss";
import { LayoutContext } from "./context";
import { SnackbarProvider } from "../snackbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showSideBar, setShowSideBar] = useState(true);
  const toggleSideBar = () => setShowSideBar(!showSideBar);

  return (
    <LayoutContext.Provider
      value={{ setShowSideBar, showSideBar, toggleSideBar }}
    >
      <SnackbarProvider>
        <div
          className={clsx(
            styles.container,
            "flex h-screen dark:text-gray-100 min-w-[500px]"
          )}
        >
          {children}
        </div>
      </SnackbarProvider>
    </LayoutContext.Provider>
  );
}
