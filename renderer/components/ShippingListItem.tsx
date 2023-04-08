import clsx from "clsx";
import ShipmentStatus from "./ShipmentStatus";
import { capitalize } from "../utils";

interface ShippingListItemProps {
  trackingNumber: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  startDate?: Date;
}

export default function ShippingListItem({
  trackingNumber,
  selected,
  description = "",
  className,
  startDate,
  onClick,
}: ShippingListItemProps) {
  return (
    <div
      className={clsx(
        "flex justify-between items-center cursor-pointer px-3 py-4 rounded-xl text-slate-400 ",
        selected && "bg-blue-500 hover:bg-blue-600 text-white",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap text-sm">
        <p className="text-xs">{trackingNumber.toUpperCase()}</p>
        <p className={clsx("font-medium", !selected && "text-black")}>
          {capitalize(description)}
        </p>
      </div>
      <ShipmentStatus startDate={startDate} />
    </div>
  );
}
