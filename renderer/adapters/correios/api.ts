import { rastrearEncomendas } from "correios-brasil";
import {
  CorreiosTrackShipment,
  GetErrorTrackShipment,
} from "./correios.interface";

export function trackShipment(
  codes: string[]
): Promise<CorreiosTrackShipment[] | GetErrorTrackShipment[]> {
  return rastrearEncomendas(codes).then((res) => {
    console.log(res);
    return res;
  });
}

const isError = (
  res: CorreiosTrackShipment | GetErrorTrackShipment
): res is GetErrorTrackShipment => {
  return "mensagem" in res;
};
