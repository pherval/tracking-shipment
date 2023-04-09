import clsx from "clsx";

export default function Divider({ className }: { className?: string }) {
  return <div className={clsx("h-[1px] bg-slate-200", className)}></div>;
}
