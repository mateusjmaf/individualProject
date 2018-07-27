import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerHttpService } from '../../service/server.http.service';

import { CashFlow } from './cash-flow.object';
import { Expense } from '../expense/expense.objects';
import { ModalAction } from '../modal/moda.interface.component';
import { ModalComponent } from '../modal/modal.component';
import { Reserve } from '../reserve/reserve.object';

// tslint:disable:no-unused-expression
@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  @ViewChild('modalExpense') modalExpense: ModalComponent;
  @ViewChild('modalExpenseDelete') modalExpenseDelete: ModalComponent;
  @ViewChild('modalReserve') modalReserve: ModalComponent;
  @ViewChild('reservePicked') reservePicked;

  clientName = ' ';

  expense: Expense;
  expenseList: Expense[];
  expenseSelected: Expense;

  flow: CashFlow;
  flowList: CashFlow[];
  flowSearchValue = ' ';

  idTransaction: number;

  reserveList: Reserve[];
  reserveOrder: number;

  restRoute = 'fluxoCaixaRest';

  primaryActionDelete: ModalAction = {
    action: () => {
      this.modalExpenseDelete.hide();
      this.deleteFlow(this.idTransaction);
    }
  };

  primaryActionExpense: ModalAction = {
    action: () => {
      this.modalExpense.hide();
    }
  };

  primaryActionReserve: ModalAction = {
    action: () => {
      this.modalReserve.hide();
    }
  };

  constructor(private serverHttp: ServerHttpService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit() {
    this.assignFlowDependeces();

    if (this.flow.idMovimento) {
      return this.serverHttp.update(this.flow, this.restRoute + '/editarFluxo').subscribe(response => {
        alert(response);
        this.resetForm();
      });

    } else {
      return this.serverHttp.create(this.flow, this.restRoute + '/addFluxo').subscribe(
        response => {
          this.resetForm();
        }
      );
    }
  }

  addExpense() {
    return this.serverHttp.create(this.expense, 'despesaRest' + '/addDespesa').subscribe(
      response => {
        this.getExpense();
      }
    );
  }

  assignFlowDependeces() {
    this.flow.tipoMovimento === 1 ? this.flow.despesa = this.expenseSelected : null;
    this.flow.tipoMovimento === 2 ? this.flow.reserva = this.reservePicked : null;
  }

  confirmExclusion(idTransaction) {
    this.idTransaction = idTransaction;
    this.modalExpenseDelete.show();
  }

  deleteFlow(idMovimento: number) {
    return this.serverHttp.delete(idMovimento, this.restRoute + '/deletarFluxo').subscribe(
      response => {
        this.searchFlow();
      }
    );
  }

  onReserveChange(reserve: Reserve) {
    this.reservePicked = reserve;
    this.clientName = reserve.cliente.nome;
    this.reserveOrder = reserve.idReserva;
  }

  openModalExpense() {
    this.modalExpense.show();
  }

  openModalExpenseExclusion() {
    this.modalExpenseDelete.show();
  }

  searchExpense() {
    return this.serverHttp.readByName(' ', 'despesaRest' + '/buscarPorNome').subscribe(response => {
      response.length > 0 ? this.expenseList = response : this.expenseList = undefined;
    });
  }

  searchFlow() {
    return this.serverHttp.readByName(this.flowSearchValue, this.restRoute + '/buscarPorTipoMovimento').subscribe(response => {
      response.length > 0 ? this.flowList = response : this.flowList = undefined;
    });
  }

  editFlow(flowParam: CashFlow) {
    this.flow = flowParam;
    this.flow.tipoMovimento = flowParam.tipoMovimento;
    flowParam.reserva ? this.onReserveChange(flowParam.reserva) : null;
  }

  getExpense() {
    return this.serverHttp.readByName(' ', 'despesaRest' + '/buscarPorNome').subscribe(response => {
      this.expenseList = response;
      this.expenseSelected = response[0];
    });
  }

  getTransactionType(tipoMovimento) {
    switch (tipoMovimento) {
      case 1 : return 'Saída';
      case 2 : return 'Entrada';
    }
  }

  getTypePayment(formaPagamento) {
    switch (formaPagamento) {
      case 1 : return 'Dinheiro';
      case 2 : return 'Cartão Débito';
      case 3 : return 'Cartão Crédito';
      case 4 : return 'Cheque';
    }
  }

  getReserves() {
    return this.serverHttp.readByName(`${this.clientName}`, 'reservaRest' + '/buscarReservasPorCliente').subscribe(response => {

      if (!undefined && response.length === 1) {
        this.onReserveChange(response[0]);

      } else {
        this.reserveList = response;
        this.modalReserve.show();
      }

    });
  }

  resetForm() {
    this.searchFlow();
    this.getExpense();
    this.expense = new Expense();
    this.flow = new CashFlow();
    this.flow.tipoMovimento = 1;
    this.reserveOrder = 0;
    this.reservePicked = undefined;
  }

}
