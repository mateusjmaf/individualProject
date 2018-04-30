import { Reserve } from "../reserve/reserve.object";

export class Additional {

  idAdicional: number;
  descricao: string;
  reserva: Reserve;
  quantidade: number;
  valor: number;

  constructor(
    idAdicional?: number,
    descricao?: string,
    reserva?: Reserve,
    quantidade?: number,
    valor?: number
  ) {
    
    this.idAdicional = idAdicional;
    this.descricao = descricao;
    this.reserva = reserva;
    this.quantidade = quantidade;
    this.valor = valor;

  }
}