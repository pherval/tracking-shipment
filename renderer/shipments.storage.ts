import { Shipment } from "./shipment.interface";
import * as storage from "./storage";

const key = "shipments";

export function getShipments(): Shipment[] {
  return storage.getItem<Shipment[]>(key) ?? [];
}

export function saveShipments(shipments: Shipment[]) {
  storage.setItem(key, shipments);
}
