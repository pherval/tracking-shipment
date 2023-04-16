export interface CorreiosTrackShipment {
  /**
   * correios tracking code
   * @example "PJ123456789BR"
   */
  codObjeto: string;
  /**
   * date due to be delivered
   * @example "2023-04-13T20:59:59"
   */
  dtPrevista: string;
  /**
   *  events of the shipment
   */
  eventos: Evento[];
  tipoPostal: TipoPostal;
  modalidade?: Modalidade;
  habilitaAutoDeclaracao: boolean;
  permiteEncargoImportacao: boolean;
  habilitaPercorridaCarteiro: boolean;
  bloqueioObjeto: boolean;
  possuiLocker: boolean;
  habilitaLocker: boolean;
  habilitaCrowdshipping: boolean;
}

export interface CorreiosTrackShipmentError {
  /**
   * correios tracking code
   * @example PJ123456789BR
   **/
  codObjeto: string;
  /**
   * error message
   * @example SRO-020: Objeto não encontrado na base de dados dos Correios.
   **/
  mensagem: string;
}

type Modalidade = "F";

interface TipoPostal {
  /**
   * category of the shipment
   * @example SEDEX, PAC, etc
   */
  categoria: string;
  /**
   * description of the shipment
   * @example ETIQUETA LOGICA SEDEX
   */
  descricao: string;
  /**
   * unknown
   * @example TF
   */
  sigla: string;
}

export interface Evento {
  /**
   * TODO: map all codes
   * @example PO
   * @example RO
   */
  codigo: string;
  descricao: string;
  /**
   * date of creation the event
   * @example "2021-04-13T20:59:59"
   */
  dtHrCriado: string;
  /**
   * unknown
   * TODO: map all types
   * @example "01"
   */
  tipo: string;
  unidade: CorreiosUnit;
  unidadeDestino?: CorreiosUnit;
  urlIcone: string;
}

interface CorreiosUnit {
  endereco: Endereco;
  /**
   * correios unit name
   * @example "CTCE BELO HORIZONTE"
   */
  nome: string;
  /**
   * correios unit internal code
   * @example TCE
   * @example Agência dos Correios
   **/
  tipo: string;
}

interface Endereco {
  /**
   * city
   */
  cidade: string;
  /**
   * state code
   * @example "SP"
   */
  uf: string;
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
