import clsx from "clsx";
import { btnIcon, type BtnIconSize, type BtnIconTheme } from "./sizing";

interface ButtonIconProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: BtnIconTheme;
  size?: BtnIconSize;
}

export default function ButtonIcon({
  theme = "default",
  size = "base",
  className,
  children,
  ...btnProps
}: ButtonIconProps) {
  return (
    <button
      className={clsx(
        "font-bold",
        btnIcon.themes[theme],
        btnIcon.sizes[size],
        className
      )}
      {...btnProps}
    >
      {children}
    </button>
  );
}
