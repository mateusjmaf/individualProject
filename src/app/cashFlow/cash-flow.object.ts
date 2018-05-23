import { Reserve } from "../reserve/reserve.object";

export class CashFlow {
  idMovimento: number;
	dataMovimento: Date;
	formaPagamento: string;
	numeroParcelas: number;
	reserva: Reserve;
	tipoMovimento: string;
	valor: number;

	constructor (
		idMovimento?: number,
		dataMovimento?: Date,
		formaPagamento?: string,
		numeroParcelas?: number,
		reserva?: Reserve,
		tipoMovimento?: string,
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