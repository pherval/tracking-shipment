import clsx from "clsx";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { useLayoutContext } from "./context";
import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useShortcut } from "../../hooks";
import { useTheme } from "../../theme";
import Toolbar from "../Toolbar";
import { IconButton } from "../buttons";

interface DetailsProps {
  children: React.ReactNode;
  title?: string;
  renderActions?: React.ReactNode;
  hideToolbar?: boolean;
}

export default function Details({
  title,
  renderActions,
  children,
  hideToolbar = false,
}: DetailsProps) {
  const { showSideBar, setShowSideBar, toggleSideBar } = useLayoutContext();
  const [darkMode, setDarkMode] = useState(false);
  const { toggleTheme } = useTheme();

  useShortcut(() => !showSideBar && setShowSideBar(true), {
    shortcut: { metaKey: true, code: "ArrowRight" },
  });

  useShortcut(() => showSideBar && setShowSideBar(false), {
    shortcut: { metaKey: true, code: "ArrowLeft" },
  });

  useShortcut(() => toggleSideBar(), {
    shortcut: { metaKey: true, code: "Slash" },
  });

  const ToggleSideBarButton = () => (
    <IconButton
      data-tooltip-content="Toggle Sidebar"
      data-tooltip-id="sidebar-switch"
      onClick={toggleSideBar}
    >
      <Tooltip id="sidebar-switch" />
      {showSideBar ? (
        <TbLayoutSidebarLeftCollapse />
      ) : (
        <TbLayoutSidebarRightCollapse />
      )}
    </IconButton>
  );

  const ThemeModeButton = () => (
    <IconButton
      data-tooltip-id="theme-btn"
      data-tooltip-content="Change Theme"
      className="absolute top-5 right-5"
      onClick={toggleTheme}
    >
      <Tooltip id="theme-btn" />
      {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </IconButton>
  );

  return (
    <div
      className={clsx(
        "bg-neutral-100 dark:bg-neutral-700 flex flex-col justify-between shadow-inner flex-grow min-w-[20] overflow-x-hidden max-h-[100vh] relative"
      )}
    >
      <ThemeModeButton />
      <div className="py-16 px-8 grow flex flex-col items-center gap-10 max-w-7xl overflow-auto">
        <h1 className="text-center text-xl font-bold">{title}</h1>
        {children}
      </div>

      {!hideToolbar && (
        <Toolbar className="absolute bottom-0">
          <ToggleSideBarButton />
          {renderActions}
        </Toolbar>
      )}
    </div>
  );
}
