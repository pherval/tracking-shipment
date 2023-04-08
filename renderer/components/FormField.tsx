import clsx from "clsx";
import { HTMLProps, MouseEventHandler, forwardRef, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useShortcut } from "../use-shortcut";

interface FormFieldProps extends HTMLProps<HTMLInputElement> {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export default forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { onClear, leftAdornment, rightAdornment, className, ...inputProps },
  ref
) {
  console.log("ref", ref);

  useShortcut((e) => {
    if (e.code === "Escape") {
      onClear?.();
    }
  }, (ref as any)?.current);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (ref) {
      (ref as any).current?.focus();
    }
  };

  const value = inputProps.value as string;

  return (
    <div
      className="flex rounded-lg gap-3 text items-center bg-slate-200 p-2"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-around items-center text-lg text-slate-500">
        {leftAdornment}
      </div>
      <input
        ref={ref}
        type="text"
        className={clsx(
          "inline-block w-full outline-none bg-slate-200",
          className
        )}
        {...inputProps}
      />
      <div className="flex gap-2 justify-around items-center text-lg text-slate-500">
        {onClear && (
          <button
            onClick={onClear}
            className={clsx(value?.length > 0 ? "visible" : "invisible")}
          >
            <IoCloseCircleSharp className="text-slate-700" />
          </button>
        )}
        {rightAdornment}
      </div>
    </div>
  );
});
