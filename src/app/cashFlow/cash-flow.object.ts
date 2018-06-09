import { Reserve } from "../reserve/reserve.object";
import { Expense } from "../expense/expense.objects";

export class CashFlow {
  idMovimento: number;
	dataMovimento: Date;
	despesa: Expense;
	formaPagamento: number;
	numeroParcelas: number;
	reserva: Reserve;
	tipoMovimento: number;
	valor: number;

	constructor (
		idMovimento?: number,
		dataMovimento?: Date,
		despesa?: Expense,
		formaPagamento?: number,
		numeroParcelas?: number,
		reserva?: Reserve,
		tipoMovimento?: number,
		valor?: number,) {

			this.idMovimento = idMovimento;
			this.dataMovimento = dataMovimento;
			this.despesa = despesa;
			this.formaPagamento = formaPagamento;
			this.numeroParcelas = numeroParcelas;
			this.reserva = reserva;
			this.tipoMovimento = tipoMovimento;
			this.valor = valor;
	}
	
}