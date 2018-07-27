import { Component, OnInit, ViewChild } from '@angular/core';

import { Client } from './client.object';
import { ModalAction } from '../modal/moda.interface.component';
import { ServerHttpService } from '../../service/server.http.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  idClient: number;
  client: Client;
  clientList: Client[];
  clientSearchValue = '';
  restRoute = 'clienteRest';

  primaryActionDelete: ModalAction = {
    action: () => {
      this.modalClientDelete.hide();
      this.deleteClient(this.idClient);
    }
  };

  @ViewChild('modalClientDelete') modalClientDelete: ModalComponent;

  constructor(private serverHttp: ServerHttpService) { }

  ngOnInit() {
    this.client = new Client();
    this.searchClient();
  }

  onSubmit() {
    if (this.client.idCliente) {
      return this.serverHttp.update(this.client, this.restRoute + '/editarCliente').subscribe(response => {
        alert(response);
        this.resetForm();
      });
    } else {
      return this.serverHttp.create(this.client, this.restRoute + '/criarCliente').subscribe( response => {
        this.searchClient();
        this.resetForm();
      });
    }
  }

  confirmExclusion(idClient) {
    this.idClient = idClient;
    this.modalClientDelete.show();
  }

  deleteClient(id: number) {
    return this.serverHttp.delete(id, this.restRoute + '/deletarCliente').subscribe( response => {
      this.searchClient();
    });
  }

  searchClient() {
    return this.serverHttp.readByName(this.clientSearchValue, this.restRoute + '/buscarClientesPorNome').subscribe(response => {
      response.length > 0 ? this.clientList = response : this.clientList = undefined;
    });
  }

  editClient(clientParam: Client) {
    this.client = clientParam;
  }

  resetForm() {
    this.client = new Client();
  }

}
