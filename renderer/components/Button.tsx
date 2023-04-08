import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: keyof typeof themes;
}

export default function Button({
  theme = "primary",
  className,
  ...btnProps
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        themes[theme],
        "p-2 rounded-lg px-6 font-medium text-sm",
        className
      )}
      {...btnProps}
    ></button>
  );
}

interface ButtonIconProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: keyof typeof iconThemes;
}

export function ButtonIcon({
  theme = "default",
  className,
  children,
  ...btnProps
}: ButtonIconProps) {
  return (
    <button
      className={clsx("font-bold text-lg", iconThemes[theme], className)}
      {...btnProps}
    >
      {children}
    </button>
  );
}

const iconThemes = {
  danger: "text-red-500",
  default: "text-slate-500",
};

const themes = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-white text-black border",
};
