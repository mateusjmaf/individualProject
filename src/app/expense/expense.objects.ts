// tslint:disable:indent
export class Expense {
  idDespesa: number;
	descricao: string;

	constructor (
    idDespesa?: number,
    descricao?: string
  ) {

    this.idDespesa = idDespesa;
    this.descricao = descricao;
  }

}
