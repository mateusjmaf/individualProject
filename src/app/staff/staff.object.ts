export class Staff {

  idStaff: number;
  nome: string;
  cell: number;
  tell: number;
  cargo: string;
  sexo: string;
  cpf: number;
  rg: number;
  endereco: string;
  cep: number;
  bairro: string;
  cidade: string;
  estado: string;
  dataNasc: Date;

  constructor(
    idStaff?: number,
    nome?: string,
    cell?: number,
    tell?: number,
    cargo?: string,
    cpf?: number,
    rg?: number,
    endereco?: string,
    cep?: number,
    bairro?: string,
    cidade?: string,
    estado?: string,
    sexo?: string,
    dataNasc?: Date
  ) {
    this.idStaff = idStaff;
    this.nome = nome;
    this.cell = cell;
    this.tell = tell;
    this.cargo = cargo;
    this.cpf = cpf;
    this.rg = rg;
    this.endereco  = endereco;
    this.cep = cep;
    this.bairro = bairro;
    this.cidade= cidade;
    this.estado = estado;
    this.sexo = sexo;
    this.dataNasc = dataNasc;
  }

}