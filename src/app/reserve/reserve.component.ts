import { Component, OnInit, ViewChild } from '@angular/core';

import { Additional } from '../additional/additional.object';
import { Card } from '../card/card.object';
import { Client } from '../client/client.object';
import { KitParty } from '../kitParty/kit-party.object';
import { Product } from '../product/product.object';
import { Reserve } from './reserve.object';

import { ServerHttpService } from '../../service/server.http.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalAction } from '../modal/moda.interface.component';
import { KitPartyComponent } from '../kitParty/kit-party.component';
import { element } from 'protractor';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  @ViewChild('modalClient') modalClient: ModalComponent;

  @ViewChild('modalCard') modalCard: ModalComponent;

  @ViewChild('clientPicked') clientPicked;

  addsValue = 0;
  addsList: Additional[];

  buttonDisabled: {};

  cardValue = 0;
  cardList:  Array<Card>;

  clientList: Client[];
  clientName = '';

  kitList: KitParty[];
  kitSelected: KitParty;

  productList: Product[];

  reserve: Reserve;
  reserveList: Reserve[];
  reserveSearchValue = ' ';

  titleCard = 'Produtos';
  titleClient = 'Clientes';

  primaryActionClient: ModalAction = {
    action: () => {
      this.modalClient.hide();
    }
  };

  primaryActionCard: ModalAction = {
    action: () => {
      this.modalCard.hide();
    }
  };

  private restRoute = 'reservaRest';

  constructor( private serverHttp: ServerHttpService ) { }

  ngOnInit() {
    this.resetForm();
    this.searchReserve();
  }

  onSubmit() {
    this.onTotalAmount();
    this.reserve.adicionais = this.addsList;
    this.reserve.cardapios = this.cardList;
    this.reserve.cliente = this.clientPicked;
    this.reserve.kitFesta = this.kitSelected;

    if (this.reserve.idReserva) {
      return this.serverHttp.update(this.reserve, this.restRoute + '/editarReserva').subscribe(response => {
        alert(response);
        this.resetForm();
      });
    } else {
      return this.serverHttp.create(this.reserve, this.restRoute + '/addReserva').subscribe(
        response => {
          this.searchReserve();
          this.resetForm();
        }
      );
    }
  }

  deleteReserve(id: number) {
    return this.serverHttp.delete(id, this.restRoute + '/deletarReserva').subscribe(
      response => {
        this.searchReserve();
      }
    );
  }

  searchReserve() {
    return this.serverHttp.readByName(this.reserveSearchValue, this.restRoute + '/buscarReservasPorCliente').subscribe(response => {
      response.length > 0 ? this.reserveList = response : this.reserveList = undefined;
    });
  }

  editReserve(reserve: Reserve) {
    this.reserve = reserve;
    this.clientPicked = reserve.cliente;
    this.clientName = this.clientPicked.nome;

    this.getCards(reserve.idReserva);
    this.onChangeProductValue(this.reserve.cardapios);

    this.getAdds(reserve.idReserva);
    this.onChangeAdditionalValue(this.reserve.adicionais);

    this.onTotalAmount();
  }

  checkProductSelected() {
    this.buttonDisabled = {};

    this.cardList.forEach(cardapio => {
      this.buttonDisabled[cardapio.produto.idProduto] = true;
    });

  }

  getAdds(id) {
    return this.serverHttp.readById(id, 'adicionalRest' + '/buscarAdicionalPorIdReserva/').subscribe(response => {
      this.addsList = response;
    });
  }

  getCards(id) {
    return this.serverHttp.readById(id, 'cardapioRest' + '/buscarCardapioPorIdReserva/').subscribe(response => {
      this.cardList = response;
      this.checkProductSelected();
    });
  }

  getClients() {
    return this.serverHttp.readByName(`${this.clientName}`, 'clienteRest' + '/buscarClientesPorNome').subscribe(response => {

      if (!undefined && response.length === 1) {
        this.clientPicked = response[0];
        this.clientName = this.clientPicked.nome;

      } else {
        this.clientList = response;
        this.modalClient.show();

      }
    });
  }

  getKits() {
    return this.serverHttp.readByName(' ', 'kitRest' + '/buscarKitPorNome').subscribe(response => {
      this.kitList = response;
      this.kitSelected = this.kitList[0];

    });
  }

  getProducts() {
    return this.serverHttp.readByName(' ', 'produtoRest' + '/buscarProdutosPorNome').subscribe(response => {
      this.productList = response;
      this.modalCard.show();

    });
  }

  // recalculate total price of adds items list
  onChangeAdditionalValue(adds) {
    this.addsValue = 0;

    for (const add of adds) {
      if (add.quantidade) {
        this.addsValue += add.quantidade * add.valor;
      }
    }
  }

  // recalculate total price of card
  onChangeProductValue(card) {
    this.cardValue = 0;

    for (const prod of card) {
      if (prod.quantidade) {
        this.cardValue += prod.quantidade * prod.valor;
      }
    }
  }

  onClientChange(client: Client) {
    this.clientPicked = client;
    this.clientName = this.clientPicked.nome;
  }

  // add new item for adds list
  onIncludesNewAdd() {
    const add = new Additional();
    this.addsList.push(add);
  }

  // add new prod for product list
  onIncludesNewProd(prod) {
    this.buttonDisabled[prod.idProduto] = true;
    const card = new Card();
    card.valor = prod.valor;
    card.quantidade = 0;
    card.produto = Object.assign(prod);
    this.cardList.push(card);
  }

  // remove any item of adds list
  onRemoveAdd(index) {
    this.addsList.splice(index, 1);
    this.onChangeAdditionalValue(this.addsList);
  }

  // remove any product of card list
  onRemoveCard(card, index) {
    this.cardList.splice(index, 1);
    this.onChangeProductValue(card);
    this.buttonDisabled[card.produto.idProduto] = false;
  }

  // calculate all prices of reserve (card, adds and kit) and subtract discount price
  onTotalAmount() {
    if (this.kitSelected.preco || this.reserve.kitFesta) {
      this.reserve.valorReserva = this.cardValue + this.addsValue + this.kitSelected.preco - this.reserve.desconto;
    }
  }

  resetForm() {
    this.addsList = new Array<Additional>();
    this.buttonDisabled = {};
    this.cardList = new Array<Card>();
    this.clientPicked = new Client();
    this.clientName = undefined;
    this.getKits();
    this.productList = new Array<Product>();
    this.reserve = new Reserve();
    this.reserve.desconto = 0;
  }

}
