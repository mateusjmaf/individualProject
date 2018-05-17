import { Reserve } from "../reserve/reserve.object";

export class CashFlow {
  idRegistro: number;
	dataRegistro: Date;
	formaPagamento: string;
	nParcelas: number;
	reserva: Reserve;
	tipoMovimento: string;
	valor: number;

	constructor (
		idRegistro?: number,
		dataRegistro?: Date,
		formaPagamento?: string,
		nParcelas?: number,
		reserva?: Reserve,
		tipoMovimento?: string,
		valor?: number,) {

			this.idRegistro = idRegistro;
			this.dataRegistro = dataRegistro;
			this.formaPagamento = formaPagamento;
			this.nParcelas = nParcelas;
			this.reserva = reserva;
			this.tipoMovimento = tipoMovimento;
			this.valor = valor;
	}
	
}