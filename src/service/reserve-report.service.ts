import { Injectable } from '@angular/core';

import * as jsPDF from 'jspdf';

import { ServerHttpService } from './server.http.service';

@Injectable()
export class ReserveReport {

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

  getReserveReport(reserveParameter) {
    this.serverHttp.readByParam(reserveParameter, `reservaRest/buscarReservasPorParametros`).subscribe(response => {
      this.generateReserveReport(reserveParameter, response);
    });
  }

  generateReserveReport(reserveParameter, reserves) {
    let dataRow = 33;
    const title = 'Relatório de Reservas';
    const reserveType = reserveParameter.tipoReserva !== '' ? reserveParameter.tipoReserva : 'Todas';
    const startDate = reserveParameter.dataInicio;
    const endDate = reserveParameter.dataFim;

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
  }
}
