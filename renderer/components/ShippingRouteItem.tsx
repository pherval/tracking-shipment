import { HiBadgeCheck as CheckIcon } from "react-icons/hi";

interface RouteItemProps {
  description?: string;
}
export default function ShippingRouteItem({
  description: v,
}: RouteItemProps): JSX.Element {
  return (
    <div className="flex gap-4 py-4 items-center relative after:content-[''] after:w-[1px] after:h-full after:bg-slate-300 after:left-[9px] after:top-0 after:absolute overflow-hidden last:after:-top-10">
      <CheckIcon className="shrink-0 text-xl text-gray-600 z-30 bg-neutral-100 dark:bg-neutral-700" />
      <p>{v}</p>
    </div>
  );
}
