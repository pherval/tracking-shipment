import clsx from "clsx";
import { IconType } from "react-icons";
import { BtnTheme, themes } from "./themes";
import { BtnBorder, borders } from "./borders";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: BtnTheme;
  border?: BtnBorder;
  LeftIcon?: IconType;
  RightIcon?: IconType;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    theme = "primary",
    border = "default",
    LeftIcon,
    RightIcon,
    className,
    children,
    ...btnProps
  },
  ref
): JSX.Element {
  return (
    <button
      ref={ref}
      className={clsx(
        "p-2 px-6 font-medium text-sm inline-block",
        borders[border],
        themes[theme],
        className
      )}
      {...btnProps}
    >
      <div className="flex gap-4 justify-between items-center">
        {LeftIcon && <LeftIcon className="text-lg" />}
        {children}
        {RightIcon && <RightIcon className="text-lg" />}
      </div>
    </button>
  );
});
