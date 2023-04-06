import React from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaCircle, FaShippingFast } from "react-icons/fa";
import ShipmentStatus from "./ShipmentStatus";

interface ShippingListItemProps {
  trackingNumber: string;
  destination: String;
  origin: string;
  renderIcon?: React.ReactNode;
  onClick?: () => void;
}

export default function ShippingListItem({
  renderIcon,
  trackingNumber,
  origin,
  destination,
  onClick,
}: ShippingListItemProps) {
  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="p-3 flex items-center justify-center bg-rose-300 rounded-xl text-xl">
          {renderIcon ? renderIcon : <FaShippingFast />}
        </div>
        <div>
          <p className="font-bold">{trackingNumber}</p>
          <p className="text-gray-400 flex items-center gap-1">
            {origin} <AiOutlineSwapRight /> {destination}
          </p>
        </div>
      </div>
      <ShipmentStatus />
    </div>
  );
}
