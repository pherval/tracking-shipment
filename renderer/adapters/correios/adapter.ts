import { rastrearEncomendas } from "correios-brasil";
import {
  CorreiosTrackShipment,
  CorreiosTrackShipmentError,
} from "./correios.dto";

export async function tracker(
  codes: string[]
): Promise<(CorreiosTrackShipment | CorreiosTrackShipmentError)[]> {
  return rastrearEncomendas(codes);
}
