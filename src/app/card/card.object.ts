import { Product } from '../product/product.object';
import { Reserve } from '../reserve/reserve.object';

export class Card {

  idCardapio: number;
  reserva: Reserve;
  produto: Product;
  quantidade: number;
  valor: number;

  constructor(
    idCardapio?: number,
    reserva?: Reserve,
    produto?: Product,
    quantidade?: number,
    valor?: number,
  ) {
    this.idCardapio = idCardapio;
    this.reserva = reserva;
    this.produto = produto;
    this.quantidade = quantidade;
    this.valor = valor;
  }

}
