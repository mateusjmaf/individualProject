import { Component, OnInit, ViewChild } from '@angular/core';

import * as jsPDF from 'jspdf';

import { CashFlow } from '../cashFlow/cash-flow.object';
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

  cashflowParameter = {
    dataInicio: Date,
    dataFim: Date,
    despesa: '',
    situacaoReserva: '',
    tipoMovimento: ' '
  };

  primaryActionCashflow: ModalAction = {
    action: () => {
      this.modalCashflowReport.hide();
      this.getFlowReport();
    }
  };

  primaryActionParty: ModalAction = {
    action: () => {
      this.modalPartyReport.hide();
      this.getReserveReport();
    }
  };

  reserveParameter = {
    dataInicio: Date,
    dataFim: Date,
    tipoReserva: ''
  };

  @ViewChild('modalCashflowReport') modalCashflowReport: ModalComponent;
  @ViewChild('modalPartyReport') modalPartyReport: ModalComponent;

  constructor(private serverHttp: ServerHttpService) { }

  ngOnInit() {
  }

  getExpense() {
    return this.serverHttp.readByName(' ', 'despesaRest' + '/buscarPorNome').subscribe(response => {
      this.expenseList = response;
      this.expenseSelected = response[0];
    });
  }

  getFlowReport() {
    this.serverHttp.readByParam(this.cashflowParameter, 'fluxoCaixaRest' + '/buscarPorParametros').subscribe(response => {
      this.generateCashflowReport(response);
    });
  }

  getReserveReport() {
    this.serverHttp.readByParam(this.reserveParameter, `reservaRest` + `/buscarReservasPorParametros`).subscribe(response => {
      this.generateReserveReport(response);
    });
  }

  getTransactionType(transactionType) {
    switch (transactionType) {
      case 1: return 'Saída';
      case 2: return 'Entrada';
      default: return 'Ambos';
    }
  }

  generatePdf(title, type, startDate, endDate) {
    const doc = new jsPDF();
    const imgLogo = '/assets/images/logo.png';

    doc.addImage(imgLogo, 14, 3, 21, 21);
    doc.setFontSize(28);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(41, 14, title);

    doc.setFontSize(8);
    doc.text(41, 18, 'Tipo: ' + type);
    doc.text(41, 22, 'Data início: ' + startDate);
    doc.text(41, 26, 'Data fim: ' + endDate);

    doc.setLineWidth(1.2);
    doc.line(7, 28, 200, 28);

    return doc;
  }

  generateCashflowReport(cashflows: Array<CashFlow>) {
    const type = this.getTransactionType(this.cashflowParameter.tipoMovimento);
    const startDate = this.cashflowParameter.dataInicio;
    let dataRow = 33;
    const title = 'Relatório do Fluxo de Caixa';
    const endDate = this.cashflowParameter.dataFim;

    const doc = this.generatePdf(title, type, startDate, endDate);

    doc.setFontSize(12);
    doc.text(14, 34, 'Data');
    doc.text(30, 34, '|    Valor ');
    doc.text(60, 34, '|    Parcela');
    doc.text(84, 34, '|    Pagamento');
    doc.text(115, 34, '|    Tipo');
    doc.text(140, 34, '|    Descrição');

    doc.line(7, 38, 200, 38);
    doc.setFontSize(10);
    doc.setFontType('normal');

    if (cashflows.length > 0) {

      for (const cashflow of cashflows) {
        dataRow += 10;
        doc.text(10, dataRow, cashflow.dataMovimento);
        doc.text(34, dataRow, 'R$' + cashflow.valor);
        doc.text(65, dataRow, cashflow.numeroParcelas + 'x');

        switch (cashflow.formaPagamento) {
          case 1 : doc.text(89, dataRow, 'Dinheiro'); break;
          case 2 : doc.text(89, dataRow, 'Cartão Débito'); break;
          case 3 : doc.text(89, dataRow, 'Cartão Crédito'); break;
          case 4 : doc.text(89, dataRow, 'Cheque'); break;
        }

        doc.text(119, dataRow, '' + this.getTransactionType(cashflow.tipoMovimento));

        if (cashflow.tipoMovimento === 1) {
          doc.text(144, dataRow, '' + cashflow.despesa.descricao);
        }

        if (cashflow.tipoMovimento === 2) {
          doc.text(144, dataRow, '' + cashflow.reserva.cliente.nome);
        }

        doc.setLineWidth(0.3);
        doc.line(7, dataRow + 3, 200, dataRow + 3);
      }

    } else {
      doc.setFont('courier');
      doc.setFontType('bolditalic');
      dataRow += 10;
      doc.text(65, dataRow, 'Nenhum dado encontrado com este parâmetro.');
    }


    doc.setLineWidth(1.2);
    doc.line(7, dataRow + 3, 200, dataRow + 3);

    doc.save('relatorioFluxoCaixa.pdf');
  }

  generateReserveReport(reserves) {
    let dataRow = 33;
    const title = 'Relatório de Reservas';
    const reserveType = this.reserveParameter.tipoReserva !== '' ? this.reserveParameter.tipoReserva : 'Todas';
    const startDate = this.reserveParameter.dataInicio;
    const endDate = this.reserveParameter.dataFim;

    const doc = this.generatePdf(title, reserveType, startDate, endDate);

    doc.setFontSize(12);
    doc.text(14, 34, 'Situação');
    doc.text(36, 34, '|    Cliente ');
    doc.text(115, 34, '|    Kit-Festa');
    doc.text(142, 34, '|    Desconto');
    doc.text(169, 34, '|    Valor total');

    doc.line(7, 38, 200, 38);
    doc.setFontSize(10);
    doc.setFontType('normal');

    if (reserves.length > 0) {

      for (const reserve of reserves) {
        dataRow += 10;
        doc.text(10, dataRow, reserve.tipoReserva);
        doc.text(40, dataRow, reserve.cliente.nome);
        doc.text(119, dataRow, reserve.kitFesta.descricao);
        doc.text(149, dataRow, 'R$' + reserve.desconto);
        doc.text(174, dataRow, 'R$' + reserve.valorReserva);

        doc.setLineWidth(0.3);
        doc.line(7, dataRow + 3, 200, dataRow + 3);
      }

    } else {
      doc.setFont('courier');
      doc.setFontType('bolditalic');
      dataRow += 10;
      doc.text(65, dataRow, 'Nenhum dado encontrado com este parâmetro.');
    }

    doc.setLineWidth(1.2);
    doc.line(7, dataRow + 3, 200, dataRow + 3);

    doc.save('relatorioReservas.pdf');
    this.resetReserveParam();
  }

  resetReserveParam() {
    this.reserveParameter.tipoReserva = '';
    this.reserveParameter.dataInicio = undefined;
    this.reserveParameter.dataFim = undefined;
  }

  showModalCashflowReport() {
    this.getExpense();
    this.modalCashflowReport.show();
  }

  showModalPartyReport() {
    this.modalPartyReport.show();
  }

}
