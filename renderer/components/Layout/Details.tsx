import clsx from "clsx";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { ButtonIcon } from "../Button";
import { useLayoutContext } from "./context";

interface DetailsProps {
  children: React.ReactNode;
  renderActions?: React.ReactNode;
}

export default function Details({ renderActions, children }: DetailsProps) {
  const { showSideBar, setShowSideBar } = useLayoutContext();

  const ToggleSideBarButton = () => (
    <ButtonIcon onClick={() => setShowSideBar(!showSideBar)}>
      {showSideBar ? (
        <TbLayoutSidebarLeftCollapse />
      ) : (
        <TbLayoutSidebarRightCollapse />
      )}
    </ButtonIcon>
  );

  return (
    <div
      className={clsx(
        "bg-neutral-100 flex flex-col justify-between shadow-inner flex-grow"
      )}
    >
      {children}

      <div className="py-3 px-8 flex justify-center gap-12 border-t shadow-md border-t-slate-200 text-xl">
        <ToggleSideBarButton />
        {renderActions}
      </div>
    </div>
  );
}
