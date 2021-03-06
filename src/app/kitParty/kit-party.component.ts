import { Component, OnInit, ViewChild } from '@angular/core';

import { ServerHttpService } from '../../service/server.http.service';

import { KitParty } from './kit-party.object';
import { ModalComponent } from '../modal/modal.component';
import { ModalAction } from '../modal/moda.interface.component';

@Component({
  selector: 'app-kit-party',
  templateUrl: './kit-party.component.html',
  styleUrls: ['./kit-party.component.css']
})
export class KitPartyComponent implements OnInit {

  idKit: number;
  kit: KitParty;
  kitList: KitParty[];
  kitSearchValue = ' ';
  restRoute = 'kitRest';

  primaryActionDelete: ModalAction = {
    action: () => {
      this.modalKitDelete.hide();
      this.deleteKit(this.idKit);
    }
  };

  @ViewChild('modalKitDelete') modalKitDelete: ModalComponent;

  constructor(private serverHttp: ServerHttpService) { this.kit = new KitParty(); }

  ngOnInit() {
    this.resetForm();
    this.searchKit();
  }

  onSubmit() {
    if (this.kit.idKit) {
      return this.serverHttp.update(this.kit, this.restRoute + '/editarKit').subscribe(response => {
        alert(response);
        this.resetForm();
      });
    } else {
      return this.serverHttp.create(this.kit, this.restRoute + '/addKit').subscribe( response => {
        this.searchKit();
        alert(response);
        this.resetForm();
      });
    }
  }

  confirmExclusion(idKit) {
    this.idKit = idKit;
    this.modalKitDelete.show();
  }

  deleteKit(id: number) {
    return this.serverHttp.delete(id, this.restRoute + '/deletarKit').subscribe( response => {
      this.searchKit();
    });
  }

  searchKit() {
    return this.serverHttp.readByName(this.kitSearchValue, this.restRoute + '/buscarKitPorNome').subscribe(response => {
      response.length > 0 ? this.kitList = response : this.kitList = undefined;
    });
  }

  editKit(KitParty: KitParty) {
    this.kit = KitParty;
  }

  resetForm() {
    this.kit = new KitParty();
    this.kit.copeiro = 0;
    this.kit.garcom = 0;
    this.kit.monitor = 0;
    this.kit.recep = 0;
  }

}
