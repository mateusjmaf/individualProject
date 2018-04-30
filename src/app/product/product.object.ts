import { Category } from "../category/category.object";

export class Product{

  idProduto: number;
	nome: string;
	codigo: number;
	descricao: string;
	valor: number;

  constructor(
    id?: number,
    nome?: string,
    codigo?: number,
    descricao?: string,
    valor?: number
  ){
    this.idProduto = id;
    this.nome = nome;
    this.codigo = codigo;
    this.descricao = descricao;
    this.valor = valor;
  }
  
}