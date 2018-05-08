import { Category } from "../category/category.object";

export class Product{

  idProduto: number;
	nome: string;
	descricao: string;
	valor: number;

  constructor(
    id?: number,
    nome?: string,
    descricao?: string,
    valor?: number
  ){
    this.idProduto = id;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
  }
  
}