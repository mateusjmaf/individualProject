import { Component, OnInit, ViewChild } from '@angular/core';

import { Expense } from '../expense/expense.objects';
import { ModalAction } from '../modal/moda.interface.component';
import { ModalComponent } from '../modal/modal.component';
import { Reserve } from '../reserve/reserve.object';
import { ServerHttpService } from '../../service/server.http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  expenseList: Expense[];
  expenseSelected: Expense;

  reserveList: Reserve[];

  reserveTypeFlowReport = ' ';
  reserveTypePartyReport = ' ';

  transactionType = '1';

  primaryActionCashflow: ModalAction = {
    action: () => {
      this.modalCashflowReport.hide();
    }
  };

  primaryActionParty: ModalAction = {
    action: () => {
      this.modalPartyReport.hide();
    }
  };

  @ViewChild('modalCashflowReport') modalCashflowReport: ModalComponent;
  @ViewChild('modalPartyReport') modalPartyReport: ModalComponent;

  constructor(private serverHttp: ServerHttpService) { }

  ngOnInit() {
  }

  showModalCashflowReport() {
    this.getExpense();
    this.modalCashflowReport.show();
  }

  showModalPartyReport() {
    this.modalPartyReport.show();
  }

  getExpense() {
    return this.serverHttp.readByName(' ', 'despesaRest' + '/buscarPorNome').subscribe(response => {
      this.expenseList = response;
      this.expenseSelected = response[0];
    });
  }

  getFlow() {
    return this.serverHttp.readByName(this.transactionType, 'fluxoCaixaRest' + '/buscarPorTipoMovimento').subscribe(response => {
      // response.length > 0 ? this.flowList = response : this.flowList = undefined;
    });
  }

}
