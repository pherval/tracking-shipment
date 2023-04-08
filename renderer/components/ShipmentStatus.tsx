import { DateTime } from "luxon";

interface ShipmentStatusProps {
  startDate: Date;
}

export default function ShipmentStatus({
  startDate = new Date(),
}: ShipmentStatusProps) {
  const start = DateTime.fromJSDate(startDate);
  const diff = DateTime.now().diff(start, "day");

  return (
    <div className="p-2 px-3 bg-white text-blue-500 border rounded-full text-sm ">
      {diff.toHuman({ listStyle: "short", maximumFractionDigits: 0 })}
    </div>
  );
}
