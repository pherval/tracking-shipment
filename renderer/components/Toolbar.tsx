import clsx from "clsx";
import React from "react";

interface ToolbarProps {
  children: React.ReactNode;
  align?: keyof typeof alignment;
  className?: string;
}

export default function Toolbar({
  className,
  children,
  align = "center",
}: ToolbarProps) {
  return (
    <div
      className={clsx(
        "py-3 px-8 flex gap-12 border-t shadow-md text-2xl w-full bg-neutral-100 dark:bg-neutral-700 border-t-gray-200 dark:border-t-gray-800 z-40",
        alignment[align],
        className
      )}
    >
      {children}
    </div>
  );
}

const alignment = {
  left: "justify-start",
  right: "justify-end",
  center: "justify-center",
};
