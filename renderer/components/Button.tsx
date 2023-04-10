import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: keyof typeof themes;
  border?: keyof typeof borders;
}

export default function Button({
  theme = "primary",
  border = "default",
  className,
  children,
  ...btnProps
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        themes[theme],
        borders[border],
        "p-2 px-6 font-medium text-sm inline-block",
        className
      )}
      {...btnProps}
    >
      <div className="flex gap-4 justify-between items-center">{children}</div>
    </button>
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
  dark: "bg-black text-white",
  secondary:
    "text-black border bg-transparent dark:text-slate-50 dark:border-slate-300",
};

const borders = {
  default: "rounded-lg",
  pill: "rounded-full",
};
