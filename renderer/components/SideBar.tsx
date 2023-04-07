interface SideBarProps {
  children: React.ReactNode;
  showSideBar?: boolean;
}
export default function SideBar({
  showSideBar = true,
  children,
}: SideBarProps): JSX.Element | null {
  if (!showSideBar) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between shadow-inner min-w-[40vw]">
      {children}
    </div>
  );
}
