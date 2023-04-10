import { BsFillCircleFill } from "react-icons/bs";

interface PlaceProps {
  label: string;
  place: string;
  status?: string;
}

export default function Place({ label, place, status }: PlaceProps) {
  return (
    <div className="border-b w-full flex flex-col gap pb-5">
      <h6 className="text-xs text-gray-400">{label}</h6>
      <div className="flex justify-between">
        <h4>{place}</h4>
        <BsFillCircleFill style={{ width: 8 }} />
      </div>
    </div>
  );
}
