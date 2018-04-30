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

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;
  
  @ViewChild('clientPicked') clientPicked;

  @ViewChild('clienteChecked') clienteChecked;

  addsValue: number = 0;
  addsList: Additional[];

  cardValue: number = 0;
  cardList: Card[];
  
  count: number = 1;

  clientList: Client[];
  clientName: string = '';

  kitList: KitParty[];
  kitSelected: KitParty;

  productList: Product[];
  
  reserve: Reserve;
  reserveList: Reserve[];
  reserveSearchValue: string = ' ';


  secondaryAction: ModalAction = {
    action: () => {
      this.modal.hide();
    },
    label: 'Cancelar'
  };
  
  primaryAction: ModalAction = {
    action: () => {
      this.modal.hide();
    },
    label: 'Confirmar'
  };

  private restRoute: string = 'reservaRest';

  constructor( private serverHttp: ServerHttpService ) { }

  ngOnInit() {
    this.resetForm();
    this.getKits();
    this.getProducts();
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
  }
  
  addKitParty() {
    // implementar adicao quando modal estiver implementada
    alert('ok');
  }
  
  onSubmit() {
    this.onTotalAmount();
    // this.convertProductListToCard();
    // this.reserve.cardapios = this.cardcardList;
    this.reserve.cliente = this.clientPicked;
    this.reserve.kitFesta = this.kitSelected;

    console.log('terasdfas', this.productList)
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

  // funcao para recalcular o valor total do cardapio de produtos
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

  // funcao para recalcular o valor total da lista de itens adicionais
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
  getProducts() {
    return this.serverHttp.readByName(' ', 'produtoRest'+'/buscarProdutosPorNome').subscribe(response => {
      this.productList = response;
      this.generateCard();
  
    })
  }

  generateCard(){
    for (let prod of this.productList) {
      for (let card of this.cardList) {
        // card.produto.push(prod);

      }
      //incluir valor somente se for false
      // if (!card.product.preco) {
      //   card.product.preco = product.valor;
      // }
    }

    for (let prod of this.productList) {
      // this.cardd
      // continua...
    }
    // console.log('this.productList', this.productList)
  }

  getClients() {
    return this.serverHttp.readByName(`${this.clientName}`, 'clienteRest'+'/buscarClientesPorNome').subscribe(response => {

      if (!undefined && response.length === 1) {
        this.clientPicked = response;
        this.clientName = this.clientPicked[0].nome;

      } else { 
        this.clientList = response;
        this.modal.show();

      }
    })
  }

  onClientChange(client: Client) {
    this.clientPicked = client;
    this.clientName = this.clientPicked.nome;
  }

  // adiciona novo item a lista de adicionais
  onIncludesNewAdd() {
    this.count++;
    var add = new Additional();
    this.addsList.push(add);
  }

  // remove determinado item da lista de adicionais
  onRemoveAdd(index) {
    this.addsList.splice(index, 1);
    this.onChangeAdditionalValue(this.addsList);
  }

  // calcula todos os valores envolvidos na tela reserva (cardápio, adicionais, kit) e subtrai valor de desconto
  onTotalAmount() {
    this.reserve.valorReserva = this.cardValue + this.addsValue + this.kitSelected.preco - this.reserve.desconto;
  }

  // convertProductListToCard() {
  //   for (let product of this.productList){
  //     if(this.productList){
        
  //     }
  //   }
    
  // }

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
