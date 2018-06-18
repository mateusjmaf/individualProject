import { Reserve } from '../reserve/reserve.object';
import { Expense } from '../expense/expense.objects';

// tslint:disable:indent

export class CashFlow {

	idMovimento: number;
	agencia: number;
	banco: string;
	contaCorrente: number;
	numeroCheque: number;
	dataMovimento: Date;
	despesa: Expense;
	formaPagamento: number;
	numeroParcelas: number;
	reserva: Reserve;
	tipoMovimento: number;
	valor: number;

	constructor (
		idMovimento?: number,
		agencia?: number,
		banco?: string,
		contaCorrente?: number,
		numeroCheque?: number,
		dataMovimento?: Date,
		despesa?: Expense,
		formaPagamento?: number,
		numeroParcelas?: number,
		reserva?: Reserve,
		tipoMovimento?: number,
		valor?: number) {

		this.idMovimento = idMovimento;
		this.agencia = agencia;
		this.banco = banco;
		this.contaCorrente = contaCorrente;
		this.numeroCheque = numeroCheque;
		this.dataMovimento = dataMovimento;
		this.despesa = despesa;
		this.formaPagamento = formaPagamento;
		this.numeroParcelas = numeroParcelas;
		this.reserva = reserva;
		this.tipoMovimento = tipoMovimento;
		this.valor = valor;
	}

}
