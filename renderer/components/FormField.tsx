import clsx from "clsx";
import { HTMLProps, MouseEventHandler, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface FormFieldProps extends HTMLProps<HTMLInputElement> {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export default function FormField({
  leftAdornment,
  rightAdornment,
  className,
  ...inputProps
}: FormFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick: MouseEventHandler = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex rounded-lg gap-3 text items-center bg-slate-200 p-2"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-around items-center text-lg text-slate-500">
        {leftAdornment}
      </div>
      <input
        ref={inputRef}
        type="text"
        className={clsx(
          "inline-block w-full outline-none bg-slate-200",
          className
        )}
        {...inputProps}
      />
      <div className="flex gap-2 justify-around items-center text-lg text-slate-500">
        {rightAdornment}
      </div>
    </div>
  );
}
