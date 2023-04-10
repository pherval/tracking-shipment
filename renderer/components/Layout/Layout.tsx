import clsx from "clsx";
import { useState } from "react";
import styles from "./Layout.module.scss";
import { LayoutContext } from "./context";

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
      <div
        className={clsx(
          styles.container,
          "flex h-screen dark:text-gray-100 min-w-[500px]"
        )}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
}
