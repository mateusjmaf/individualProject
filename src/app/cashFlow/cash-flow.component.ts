import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerHttpService } from '../../service/server.http.service';

import { CashFlow } from './cash-flow.object';
import { ModalComponent } from '../modal/modal.component';
import { ModalAction } from '../modal/moda.interface.component';
import { Reserve } from '../reserve/reserve.object';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
  
  @ViewChild('reservePicked') reservePicked;

  @ViewChild('modalReserve') modalReserve: ModalComponent;

  clientName: string = ' ';

  flow: CashFlow;
  flowList: CashFlow[];
  
  flowSearchValue: string = '';
  
  reserveList: Reserve[];
  reserveOrder: number;

  restRoute: string = 'fluxoCaixaRest';

  titleReserves = "Reservas";
  
  primaryActionReserve: ModalAction = {
    action: () => {
      this.modalReserve.hide();
    }
  };
  constructor(private serverHttp: ServerHttpService) { }
  
  ngOnInit() {
    this.resetForm();
    
  }
  
  addCategoria() {

  }

  onSubmit() {
    this.reservePicked ? this.flow.reserva = this.reservePicked : null;

    if(this.flow.idMovimento) {
      return this.serverHttp.update(this.flow, this.restRoute+'/editarFluxo').subscribe(response => {
        alert(response);
        this.resetForm();
      })
    } else {
      return this.serverHttp.create(this.flow, this.restRoute+'/addFluxo').subscribe(
        response => { 
          this.resetForm();
        }
      )
    }
  }

  onReserveChange(reserve: Reserve) {
    this.reservePicked = reserve;
    this.clientName = this.reservePicked.cliente.nome;
    this.reserveOrder = this.reservePicked.idReserva;
  }

  deleteFlow(idMovimento: number) {
    return this.serverHttp.delete(idMovimento, this.restRoute+'/deletarFluxo').subscribe(
      response => { 
        this.searchFlow();
      }
    )
  }

  searchFlow() {
    return this.serverHttp.readByName(this.flowSearchValue, this.restRoute+'/buscarPorTipoMovimento').subscribe(response => {
      response.length > 0 ? this.flowList = response : this.flowList = undefined;
    })
  }

  editFlow(flowParam: CashFlow) {
    this.flow = flowParam;
  }

  getReserves() {
    return this.serverHttp.readByName(`${this.clientName}`, 'reservaRest'+'/buscarReservasPorCliente').subscribe(response => {

      if (!undefined && response.length === 1) {
        this.onReserveChange(response[0]);

      } else { 
        this.reserveList = response;
        this.modalReserve.show();
      }

    })
  }

  resetForm() {
    this.searchFlow();
    this.flow = new CashFlow();
    this.reserveOrder = 0;
    // alterar para Saída
    this.flow.tipoMovimento = 'Entrada';
  }

}
