import { map, partition } from "ramda";
import { tracker } from "./adapter";
import { transformTracking } from "./api.mapper";
import type {
  CorreiosTrackShipment,
  CorreiosTrackShipmentError,
} from "./correios.dto";
import type { TrackingShipment } from "./tracking.interface";

type Response = {
  trackings: TrackingShipment[];
  errors?: AggregateError;
};

export async function trackShipments(codes: string[]): Promise<Response> {
  try {
    const res = await tracker(codes);

    const [errors, data] = partition(isError, res) as [
      CorreiosTrackShipmentError[],
      CorreiosTrackShipment[]
    ];

    return {
      trackings: map(transformTracking, data),
      errors: errors.some(isError)
        ? new AggregateError(errors.map((e) => new Error(e.mensagem)))
        : undefined,
    };
  } catch (err) {
    throw new Error("unkown tracking error", { cause: err });
  }
}

const isError = (
  res: CorreiosTrackShipment | CorreiosTrackShipmentError
): res is CorreiosTrackShipmentError => {
  return "mensagem" in res;
};
