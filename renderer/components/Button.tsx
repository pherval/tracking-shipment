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

const themes = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-white text-black border",
};
