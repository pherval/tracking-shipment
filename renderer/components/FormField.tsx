import clsx from "clsx";
import { HTMLProps } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface FormFieldProps extends HTMLProps<HTMLInputElement> {}

export default function FormField({
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="flex rounded">
      <input
        type="text"
        className={clsx(
          "inline-block p-2 outline-none pr-4 rounded-lg w-full",
          className
        )}
        {...inputProps}
      />
      <button
        type="submit"
        className="bg-black text-white p-3 text-sm rounded-lg -ml-2"
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
}
