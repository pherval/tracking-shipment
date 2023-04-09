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
  theme?: keyof typeof btnIcon["themes"];
  size?: keyof typeof btnIcon["sizes"];
}

export function ButtonIcon({
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

const btnIcon = {
  themes: {
    danger: "text-red-500",
    default: "text-slate-900 dark:text-slate-200",
  },
  sizes: {
    base: "text-xl",
    lg: "text-2xl",
  },
};

const themes = {
  primary: "bg-blue-500 dark:bg-blue-800 text-white",
  secondary:
    "text-black border bg-transparent dark:text-slate-50 dark:border-slate-300",
};
