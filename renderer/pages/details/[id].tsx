import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLeft } from "react-icons/ai";
import { IconButton } from "../../components";
import { Details } from "../../components/Layout";
import { useShipmentById } from "../../hooks";
import { useEffect } from "react";

export default function RoutePage() {
  const {
    query: { id },
  } = useRouter();
  const shipment = useShipmentById(id as string);

  return (
    <Details hideToolbar>
      <Link href="/home">
        <a>
          <IconButton className="absolute top-10 left-10">
            <AiOutlineLeft />
          </IconButton>
        </a>
      </Link>

      <h1>Routes</h1>
      <p>{shipment?.trackingNumber}</p>
    </Details>
  );
}
