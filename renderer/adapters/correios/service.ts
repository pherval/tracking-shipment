import { head, map, partition } from "ramda";
import { tracker } from "./adapter";
import { transformTracking } from "./api.mapper";
import type {
  CorreiosTrackShipment,
  CorreiosTrackShipmentError,
} from "./correios.dto";
import type { TrackingShipment } from "./tracking.interface";
import { CorreiosError } from "./correios.error";

export async function trackShipment(codes: string): Promise<TrackingShipment> {
  const res = await tracker([codes]);

  const [errors, data] = partition(isError, res) as [
    CorreiosTrackShipmentError[],
    CorreiosTrackShipment[]
  ];

  if (errors.some(isError)) {
    throw new CorreiosError(errors.find(isError)?.mensagem);
  }

  const shipments = map(transformTracking, data);

  const shipment = head(shipments);
  if (!shipment) {
    throw new CorreiosError("no tracking found");
  }

  return shipment;
}

const isError = (
  res: CorreiosTrackShipment | CorreiosTrackShipmentError
): res is CorreiosTrackShipmentError => {
  return "mensagem" in res;
};
