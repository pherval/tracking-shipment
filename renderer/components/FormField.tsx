import clsx from "clsx";
import { HTMLProps, MouseEventHandler, forwardRef, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface FormFieldProps extends HTMLProps<HTMLInputElement> {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  clearable?: boolean;
}

export default forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { clearable, leftAdornment, rightAdornment, className, ...inputProps },
  ref
) {
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (ref) {
      (ref as any).current?.focus();
    }
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
        ref={ref}
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
});
