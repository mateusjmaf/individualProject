import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

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

  @ViewChild('clienteChecked') clienteChecked;

  buttonDisabled: {} = {};

  addsValue: number = 0;
  addsList: Additional[];

  cardValue: number = 0;
  cardList:  Array<Card>;
  
  count: number = 1;

  clientList: Client[];
  clientName: string = '';

  kitList: KitParty[];
  kitSelected: KitParty;

  productList: Product[];
  
  reserve: Reserve;
  reserveList: Reserve[];
  reserveSearchValue: string = ' ';

  titleCard = "Produtos";
  titleClient = "Clientes";
  
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

  private restRoute: string = 'reservaRest';

  constructor( private serverHttp: ServerHttpService ) { }

  ngOnInit() {
    this.resetForm();
    this.getKits();
    // this.searchReserve();
  }
  
  
  deleteReserve(id: number) {
    return this.serverHttp.delete(id, this.restRoute+'/deletarReserva').subscribe(
      response => { 
        this.searchReserve();
      }
    )
  }
  
  searchReserve() {
    return this.serverHttp.readByName(this.reserveSearchValue, this.restRoute+'/buscarReservasPorCliente').subscribe(response => {
      response.length > 0 ? this.reserveList = response : this.reserveList = undefined;
    })
  }
  
  editReserve(reserve: Reserve) {
    this.reserve = reserve;
    this.buttonDisabled = {};
    
    // verifica se há determinado produto no cardapio, se sim desabilita botão para adicionar ao cardapio
    // this.reserve.cardapios.forEach(cardapio =>{
    //   this.buttonDisabled[cardapio.produto.idProduto] = true;
    // })
  }
  
  addKitParty() {
    // implementar adicao quando modal estiver implementada
    alert('ok');
  }
  
  onSubmit() {
    this.onTotalAmount();
    // this.reserve.cardapios = this.cardList;
    this.reserve.cliente = this.clientPicked;
    this.reserve.kitFesta = this.kitSelected;

    if(this.reserve.idReserva) {
      return this.serverHttp.update(this.reserve, this.restRoute+'/editarReserva').subscribe(response => {
        alert(response);
        this.resetForm();
      })
    } else {
      return this.serverHttp.create(this.reserve, this.restRoute+'/addReserva').subscribe(
        response => { 
          this.searchReserve();
          this.resetForm();
        }
      )
    }
  }

  // recalculate total price of card 
  onChangeProductValue(list) {
    this.cardValue = 0;
    let subTotal = 0;
    
    for(let prod of list) {
      if(prod.quantidade) {
        subTotal += prod.quantidade * prod.valor;
      }
    }
    this.cardValue += subTotal;
  }

  // recalculate total price of adds items list
  onChangeAdditionalValue(list) {
    this.addsValue = 0;
    let subTotal = 0;
    
    for(let add of list) {
      if(add.quantidade) {
        subTotal += add.quantidade * add.valor;
      }
    }
    this.addsValue += subTotal;
  }

  getKits() {
    return this.serverHttp.readByName(' ', 'kitRest'+'/buscarKitPorNome').subscribe(response => {
      this.kitList = response;
      this.kitSelected = this.kitList[0];
    })
  }

  getCards(id) {
    return this.serverHttp.readById(id, 'cardapioRest' +'/buscarCardapioPorIdReserva/').subscribe(response => {
      // response.length > 0 ? this.cardList = response : this.cardList = undefined;
      this.cardList = response;
    })
  }

  getProducts() {
    return this.serverHttp.readByName(' ', 'produtoRest'+'/buscarProdutosPorNome').subscribe(response => {
      this.productList = response;
      console.log(this.productList);
      this.modalCard.show();
    })
  }

  getClients() {
    return this.serverHttp.readByName(`${this.clientName}`, 'clienteRest'+'/buscarClientesPorNome').subscribe(response => {

      if (!undefined && response.length === 1) {
        this.clientPicked = response;
        this.clientName = this.clientPicked[0].nome;

      } else { 
        this.clientList = response;
        this.modalClient.show();

      }
    })
  }

  onClientChange(client: Client) {
    this.clientPicked = client;
    this.clientName = this.clientPicked.nome;
  }
  
  // add new item for adds list
  onIncludesNewAdd() {
    this.count++;
    var add = new Additional();
    this.addsList.push(add);
  }

  // add new prod for product list
  onIncludesNewProd(prod) {
    this.buttonDisabled[prod.idProduto] = true;
    this.cardList.push(prod);
  }

  // remove determinado item da lista de adicionais
  onRemoveAdd(index) {
    this.addsList.splice(index, 1);
    this.onChangeAdditionalValue(this.addsList);
  }

  // calculate all prices of reserve (card, adds and kit) and subtract discount price
  onTotalAmount() {
    this.reserve.valorReserva = this.cardValue + this.addsValue + this.kitSelected.preco - this.reserve.desconto;
  }

  resetForm() {
    this.addsList = new Array<Additional>();
    this.cardList = new Array<Card>();
    this.clientPicked = new Client();
    this.clientList = new Array<Client>();
    this.productList = new Array<Product>();
    this.reserve = new Reserve();
    this.reserve.desconto = 0;
  }

}
