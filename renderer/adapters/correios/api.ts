import { rastrearEncomendas } from "correios-brasil";
import {
  CorreiosTrackShipment,
  CorreiosTrackShipmentError,
} from "./correios.dto";

export async function trackShipment(
  codes: string[]
): Promise<CorreiosTrackShipment[] | CorreiosTrackShipmentError[]> {
  return rastrearEncomendas(codes);
}

const isError = (
  res: CorreiosTrackShipment | CorreiosTrackShipmentError
): res is CorreiosTrackShipmentError => {
  return "mensagem" in res;
};
