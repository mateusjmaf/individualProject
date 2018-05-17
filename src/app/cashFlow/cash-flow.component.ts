import { Component, OnInit } from '@angular/core';
import { CashFlow } from './cash-flow.object';

import { ServerHttpService } from '../../service/server.http.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  cashFlow: CashFlow;
  clientList: CashFlow[];
  clientSearchValue: string = '';
  restRoute: string = 'clienteRest';

  constructor(private serverHttp: ServerHttpService) { }
  
  ngOnInit() {
    this.cashFlow = new CashFlow();
    this.cashFlow.tipoMovimento = 'outflow';
    this.searchClient();
  }
  
  addCategoria() {

  }

  onSubmit() {
    if(this.cashFlow.idRegistro) {
      return this.serverHttp.update(this.cashFlow, this.restRoute+'/editarCliente').subscribe(response => {
        alert(response);
        this.resetForm();
      })
    } else {
      return this.serverHttp.create(this.cashFlow, this.restRoute+'/criarCliente').subscribe(
        response => { 
          this.searchClient();
          this.resetForm();
        }
      )
    }
  }

  deleteClient(id: number) {
    return this.serverHttp.delete(id, this.restRoute+'/deletarCliente').subscribe(
      response => { 
        this.searchClient();
      }
    )
  }

  searchClient() {
    return this.serverHttp.readByName(this.clientSearchValue, this.restRoute+'/buscarClientesPorNome').subscribe(response => {
      response.length > 0 ? this.clientList = response : this.clientList = undefined;
    })
  }

  editClient(clientParam: CashFlow) {
    this.cashFlow = clientParam;
  }

  resetForm() {
    this.cashFlow = new CashFlow();
  }


}
