import clsx from "clsx";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { ButtonIcon } from "../Button";
import { useLayoutContext } from "./context";
import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useShortcut } from "../../hooks";
import { useTheme } from "../../theme";

interface DetailsProps {
  children: React.ReactNode;
  renderActions?: React.ReactNode;
}

export default function Details({ renderActions, children }: DetailsProps) {
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
    <ButtonIcon
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
    </ButtonIcon>
  );

  const ThemeModeButton = () => (
    <ButtonIcon
      data-tooltip-id="theme-btn"
      data-tooltip-content="Change Theme"
      className="absolute top-5 right-5"
      onClick={toggleTheme}
    >
      <Tooltip id="theme-btn" />
      {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </ButtonIcon>
  );

  return (
    <div
      className={clsx(
        "bg-neutral-100 dark:bg-neutral-700 flex flex-col justify-between shadow-inner flex-grow"
      )}
    >
      <ThemeModeButton />
      <div>{children}</div>

      <div className="py-3 px-8 flex justify-center gap-12 border-t shadow-md border-t-slate-200 dark:border-t-gray-800 text-2xl">
        <ToggleSideBarButton />
        {renderActions}
      </div>
    </div>
  );
}
