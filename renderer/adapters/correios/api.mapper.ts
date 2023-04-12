import { DateTime } from "luxon";
import type { TrackingShipment } from "./tracking.interface";
import type { CorreiosTrackShipment } from "./correios.dto";

export const transformTracking = ({
  codObjeto,
  dtPrevista,
  eventos,
  possuiLocker,
  bloqueioObjeto,
}: CorreiosTrackShipment): TrackingShipment => {
  return {
    code: codObjeto,
    dueDate: DateTime.fromISO(dtPrevista, { zone: "pt-br" }).toJSDate(),
    isLocked: possuiLocker || bloqueioObjeto,
    events: eventos.map((e) => ({
      code: e.codigo,
      description: e.descricao,
      createdAt: DateTime.fromISO(e.dtHrCriado).toJSDate(),
      origin: {
        city: e.unidade.endereco.cidade,
        brazilFederalUnit: e.unidade.endereco.uf,
      },
      destination: e.unidadeDestino
        ? {
            city: e.unidade.endereco.cidade,
            brazilFederalUnit: e.unidade.endereco.uf,
          }
        : undefined,
    })),
  };
};
