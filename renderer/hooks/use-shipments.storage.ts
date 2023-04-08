import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Shipment } from "../shipment.interface";
import { getShipments, saveShipments } from "../shipments.storage";

export function useShipmentsStorage(
  initialShipments: Shipment[] = []
): [Shipment[], Dispatch<SetStateAction<Shipment[]>>] {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);

  useEffect(() => {
    setShipments(getShipments());
  }, []);

  useEffect(() => {
    saveShipments(shipments);
  }, [shipments]);

  return [shipments, setShipments];
}
