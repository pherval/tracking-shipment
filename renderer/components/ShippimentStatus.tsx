import { FaCircle } from "react-icons/fa";

export default function ShippimentStatus() {
  return (
    <div className="py-1 px-2 border rounded-lg m-0 text-sm border-slate-800 text-slate-800 flex gap-2 items-center">
      <FaCircle className="text-green-400" fontSize={10} />
      In Transit
    </div>
  );
}
