import clsx from "clsx";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { ButtonIcon } from "../Button";
import { useLayoutContext } from "./context";
import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

interface DetailsProps {
  children: React.ReactNode;
  renderActions?: React.ReactNode;
}

export default function Details({ renderActions, children }: DetailsProps) {
  const { showSideBar, setShowSideBar } = useLayoutContext();
  const [darkMode, setDarkMode] = useState(false);

  const ToggleSideBarButton = () => (
    <ButtonIcon onClick={() => setShowSideBar(!showSideBar)}>
      {showSideBar ? (
        <TbLayoutSidebarLeftCollapse />
      ) : (
        <TbLayoutSidebarRightCollapse />
      )}
    </ButtonIcon>
  );

  const ThemeModeButton = () => (
    <ButtonIcon onClick={() => alert("not implemented")}>
      {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </ButtonIcon>
  );

  return (
    <div
      className={clsx(
        "bg-neutral-100 dark:bg-neutral-700 flex flex-col justify-between shadow-inner flex-grow"
      )}
    >
      {children}

      <div className="py-3 px-8 flex justify-center gap-12 border-t shadow-md border-t-slate-200 text-2xl">
        <ToggleSideBarButton />
        <ThemeModeButton />
        {renderActions}
      </div>
    </div>
  );
}
