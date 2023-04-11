export interface CorreiosTrackShipment {
  codObjeto: string;
  eventos: Evento[];
  modalidade: Modalidade;
  tipoPostal: TipoPostal[];
  habilitaAutoDeclaracao: boolean;
  permiteEncargoImportacao: boolean;
  habilitaPercorridaCarteiro: boolean;
  bloqueioObjeto: boolean;
  possuiLocker: boolean;
  habilitaLocker: boolean;
  habilitaCrowdshipping: boolean;
}

export interface GetErrorTrackShipment {
  codObjeto: string;
  mensagem: string;
}

type Modalidade = "F";
type TipoPostal = Object;

export interface Evento {
  status: string;
  data: string;
  hora: string;
  origem?: string;
  destino?: string;
  local?: string;
}

/**
 * 04014 = SEDEX à vista

04065 = SEDEX à vista pagamento na entrega

04510 = PAC à vista

04707 = PAC à vista pagamento na entrega

40169 = SEDEX12 ( à vista e a faturar)

40215 = SEDEX 10 (à vista e a faturar)

40290 = SEDEX Hoje Varejo
 */

export enum CodigoServico {
  // SEDEX à vista
  SedexAVista = "04014",

  // SEDEX à vista pagamento na entrega
  SedexPgtoEntrega = "04065",

  // PAC à vista
  PacAVista = "04510",

  // PAC à vista pagamento na entrega
  PacPgtoEntrega = "04707",

  // SEDEX12 ( à vista e a faturar)
  Sedex12 = "40169",

  // SEDEX 10 (à vista e a faturar)
  Sedex10 = "40215",

  // SEDEX Hoje Varejo
  SedexHoje = "40290",
}
