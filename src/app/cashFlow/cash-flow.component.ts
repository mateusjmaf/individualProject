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

  flow: CashFlow;
  flowList: CashFlow[];
  
  flowSearchValue: string = '';
  
  reserveList: Reserve[];
  reserveOrder: number = 0;

  restRoute: string = 'fluxoCaixaRest';

  titleReserves = "Reservas";
  
  primaryActionReserve: ModalAction = {
    action: () => {
      this.modalReserve.hide();
    }
  };
  constructor(private serverHttp: ServerHttpService) { }
  
  ngOnInit() {
    this.flow = new CashFlow();
    // alterar para outflow
    this.flow.tipoMovimento = 'inflow';
    // this.searchFlow();
  }
  
  addCategoria() {

  }

  onSubmit() {
    if(this.flow.idMovimento) {
      return this.serverHttp.update(this.flow, this.restRoute+'/editarFluxo').subscribe(response => {
        alert(response);
        this.resetForm();
      })
    } else {
      return this.serverHttp.create(this.flow, this.restRoute+'/addFluxo').subscribe(
        response => { 
          // this.searchFlow();
          this.resetForm();
        }
      )
    }
  }

  onReserveChange(reserve: Reserve) {
    this.reservePicked = reserve;
    this.reserveOrder = this.reservePicked.idReserve;
  }

  deleteFlow(id: number) {
    return this.serverHttp.delete(id, this.restRoute+'/deletarFluxo').subscribe(
      response => { 
        // this.searchFlow();
      }
    )
  }

  searchFlow() {
    return this.serverHttp.readByName(this.flowSearchValue, this.restRoute+'/buscarFluxoPorTipoMovimentacao').subscribe(response => {
      response.length > 0 ? this.flowList = response : this.flowList = undefined;
    })
  }

  editFlow(clientParam: CashFlow) {
    this.flow = clientParam;
  }

  getReserves() {
    this.modalReserve.show();
  }

  resetForm() {
    this.flow = new CashFlow();
  }


}
