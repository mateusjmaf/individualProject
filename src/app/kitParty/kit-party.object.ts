export class KitParty {
  idKit: number;
	descricao: string;
	decorBasic: boolean;
	preco: number;
	garcom: number;
	recep: number;
	copeiro: number;
	monitor: number;
	seg: boolean;
	ter: boolean;
	qua: boolean;
	qui: boolean;
	sex: boolean;
	sab: boolean;
	dom: boolean;

  constructor(
    id?: number,
	  desc?: string,
	  decorBasic?: boolean,
	  preco?: number,
	  garcom?: number,
	  recep?: number,
	  copeiro?: number,
	  monitor?: number,
	  sg?: boolean,
	  tr?: boolean,
	  qa?: boolean,
	  qi?: boolean,
	  sx?: boolean,
	  sb?: boolean,
	  dm?: boolean,
  ){

    this.idKit = id;
    this.descricao = desc;
    this.decorBasic = decorBasic;
    this.preco = preco;
    this.garcom = garcom; 
    this.recep = recep;
    this.copeiro = copeiro;
    this.monitor = monitor;
    this.seg = sg;
    this.ter = tr;
    this.qua = qa;
    this.qui = qi;
    this.sex = sx;
    this.sab = sb;
    this.dom = dm;
  }
  
}