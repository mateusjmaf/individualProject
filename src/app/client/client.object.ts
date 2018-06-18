export class Client {

  idCliente: number;
  nome: string;
  cell: number;
  tell: number;
  email: string;
  cpf: number;
  rg: number;
  endereco: string;
  cep: number;
  bairro: string;
  cidade: string;
  estado: string;
  sexo: string;
  datNasc: Date;

  constructor(
    idCliente?: number,
    nome?: string,
    cell?: number,
    tell?: number,
    email?: string,
    cpf?: number,
    rg?: number,
    endereco?: string,
    cep?: number,
    bairro?: string,
    cidade?: string,
    estado?: string,
    sexo?: string,
    datNasc?: Date
  ) {
    this.idCliente = idCliente;
    this.nome = nome;
    this.cell = cell;
    this.tell = tell;
    this.email = email;
    this.cpf = cpf;
    this.rg = rg;
    this.endereco  = endereco;
    this.cep = cep;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.sexo = sexo;
    this.datNasc = datNasc;
  }

}
