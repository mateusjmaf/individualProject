import { Injectable } from '@angular/core';

import * as jsPDF from 'jspdf';
import { ServerHttpService } from './server.http.service';

import { CashFlow } from '../app/cashFlow/cash-flow.object';

@Injectable()
export class CashflowReport {

  constructor(private serverHttp: ServerHttpService) { }

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

  getFlowReport(cashflowParameter) {
    this.serverHttp.readByParam(cashflowParameter, 'fluxoCaixaRest/buscarPorParametros').subscribe(response => {
      this.generateCashflowReport(cashflowParameter, response);
    });
  }

  generateCashflowReport(cashflowParameter, cashflows: Array<CashFlow>) {
    const type = this.getTransactionType(cashflowParameter.tipoMovimento);
    const startDate = cashflowParameter.dataInicio;
    let dataRow = 33;
    const title = 'Relatório do Fluxo de Caixa';
    const endDate = cashflowParameter.dataFim;

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

  getTransactionType(transactionType) {
    switch (transactionType) {
      case 1: return 'Saída';
      case 2: return 'Entrada';
      default: return 'Ambos';
    }
  }

}
