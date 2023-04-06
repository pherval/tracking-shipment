import React from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaCircle, FaShippingFast } from "react-icons/fa";
import ShippimentStatus from "./ShippimentStatus";

interface ShippingListItemProps {
  trackingNumber: string;
  destination: String;
  origin: string;
  renderIcon?: React.ReactNode;
}

export default function ShippingListItem({
  renderIcon,
  trackingNumber,
  origin,
  destination,
}: ShippingListItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <div className="p-3 flex items-center justify-center bg-rose-300 rounded-xl text-xl">
          {renderIcon ? renderIcon : <FaShippingFast />}
        </div>
        <div>
          <p className="font-bold">{trackingNumber}</p>
          <p className="text-gray-400 flex justify-around items-center gap-3">
            {origin} <AiOutlineSwapRight /> {destination}
          </p>
        </div>
      </div>
      <ShippimentStatus />
    </div>
  );
}
