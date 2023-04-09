import clsx from "clsx";
import { HTMLProps, MouseEventHandler, forwardRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useShortcut } from "../hooks";

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
  const actualRef = ref as any | undefined;

  useShortcut(() => onClear?.(), {
    shortcut: { code: "Escape" },
    useGlobal: false,
    target: actualRef?.current,
  });

  const onClick: MouseEventHandler<HTMLDivElement> = () => {
    actualRef?.current?.focus();
  };

  const value = inputProps.value as string;

  return (
    <div
      className="flex rounded-lg gap-3 text items-center bg-gray-200 dark:bg-slate-600 px-2 text-black dark:text-white"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-around items-center text-lg text-slate-200 dark:text-slate:200">
        {leftAdornment}
      </div>
      <input
        ref={actualRef}
        type="text"
        className={clsx(
          "inline-block w-full outline-none py-2 h-full bg-gray-200 dark:bg-slate-600",
          className
        )}
        {...inputProps}
      />
      <div className="flex gap-2 justify-around items-center text-lg text-slate-500 dark:text-slate-200">
        {onClear && (
          <button
            onClick={onClear}
            className={clsx(value?.length > 0 ? "visible" : "invisible")}
          >
            <IoCloseCircleSharp />
          </button>
        )}
        {rightAdornment}
      </div>
    </div>
  );
});
