import { Component, OnInit, ViewChild } from '@angular/core';

import { CashflowReport } from '../../service/cashflow-report.service';
import { ReserveReport } from '../../service/reserve-report.service';
import { ServerHttpService } from '../../service/server.http.service';

import { Expense } from '../expense/expense.objects';
import { ModalAction } from '../modal/moda.interface.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  expenseList: Expense[];
  expenseSelected: Expense;
  cashflowParameter: {};
  reserveParameter = {};

  primaryActionCashflow: ModalAction = {
    action: () => {
      this.modalCashflowReport.hide();
      this.cashflowReport.getFlowReport(this.cashflowParameter);
    }
  };

  primaryActionParty: ModalAction = {
    action: () => {
      this.modalPartyReport.hide();
      this.reserveReport.getReserveReport(this.reserveParameter);
    }
  };

  @ViewChild('modalCashflowReport') modalCashflowReport: ModalComponent;
  @ViewChild('modalPartyReport') modalPartyReport: ModalComponent;

  constructor(
    private cashflowReport: CashflowReport,
    private reserveReport: ReserveReport,
    private serverHttp: ServerHttpService
  ) { }

  ngOnInit() {
    this.createCashflowParameterObject();
    this.createReserveParameterObject();
  }

  createCashflowParameterObject() {
    return this.cashflowParameter = {
      dataInicio: Date,
      dataFim: Date,
      despesa: '',
      situacaoReserva: '',
      tipoMovimento: ' '
    };
  }

  createReserveParameterObject() {
    return this.reserveParameter = {
      dataInicio: Date,
      dataFim: Date,
      tipoReserva: ''
    };
  }

  getExpense() {
    return this.serverHttp.readByName(' ', 'despesaRest/buscarPorNome').subscribe(response => {
      this.expenseList = response;
      this.expenseSelected = response[0];
    });
  }

  showModalCashflowReport() {
    this.createCashflowParameterObject();
    this.getExpense();
    this.modalCashflowReport.show();
  }

  showModalPartyReport() {
    this.createReserveParameterObject();
    this.modalPartyReport.show();
  }

}
