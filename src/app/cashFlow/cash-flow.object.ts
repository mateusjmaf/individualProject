import { Reserve } from "../reserve/reserve.object";

export class CashFlow {
  idMovimento: number;
	dataMovimento: Date;
	formaPagamento: number;
	numeroParcelas: number;
	reserva: Reserve;
	tipoMovimento: number;
	valor: number;

	constructor (
		idMovimento?: number,
		dataMovimento?: Date,
		formaPagamento?: number,
		numeroParcelas?: number,
		reserva?: Reserve,
		tipoMovimento?: number,
		valor?: number,) {

			this.idMovimento = idMovimento;
			this.dataMovimento = dataMovimento;
			this.formaPagamento = formaPagamento;
			this.numeroParcelas = numeroParcelas;
			this.reserva = reserva;
			this.tipoMovimento = tipoMovimento;
			this.valor = valor;
	}
	
}