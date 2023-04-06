import clsx from "clsx";
import React from "react";

interface BoxProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Box({ children, className, ...divProps }: BoxProps) {
  return (
    <div
      className={clsx("rounded-xl flex flex-col gap-5", className)}
      {...divProps}
    >
      {children}
    </div>
  );
}
