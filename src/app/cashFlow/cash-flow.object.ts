import { Reserve } from "../reserve/reserve.object";

export class CashFlow {
  idRegitro: number;
	tipoMovimento: string;
	reserva: Reserve;
	formaPagamento: string;
	nParcelas;
	dataRegistro: Date;
	valor: number;
}