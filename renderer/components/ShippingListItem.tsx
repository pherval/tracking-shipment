import clsx from "clsx";
import { capitalize } from "../utils";
import ShipmentStatus from "./ShipmentStatus";

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
        "flex justify-between items-center cursor-pointer px-3 py-4 rounded-xl text-slate-400 relative",
        selected &&
          "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-800 transition duration-300",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap text-sm">
        <p className="text-xs">{trackingNumber.toUpperCase()}</p>
        <p
          className={clsx(
            "font-medium",
            !selected && "text-black dark:text-slate-50"
          )}
        >
          {capitalize(description)}
        </p>
      </div>
      <ShipmentStatus startDate={startDate} />
    </div>
  );
}
