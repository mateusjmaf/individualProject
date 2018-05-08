import { Additional } from "../additional/additional.object";
import { Card } from "../card/card.object";
import { Client } from "../client/client.object";
import { KitParty } from "../kitParty/kit-party.object";

export class Reserve {
	
  idReserva: number;
	aniversariante: string;
	cardapios: Array<Card>;
	cliente: Client;
	dataReserva: Date;
	desconto: number;
	idadeAniver: number;
	kitFesta: KitParty
	tipoReserva: string;
	valorReserva: number;

	constructor(
		idReserva?: number,
		aniversariante?: string,
		cardapios?: Array<Card>,
		cliente?: Client,
		dataReserva?: Date,
		desconto?: number,
		idadeAniver?: number,
		kitFesta?: KitParty,
		tipoReserva?: string,
		valorReserva?: number,
	) {

		this.idReserva = idReserva;
		this.aniversariante = aniversariante;
		this.cardapios = cardapios;
		this.cliente = cliente;
		this.dataReserva = dataReserva;
		this.desconto = desconto;
		this.idadeAniver = idadeAniver;
		this.kitFesta = kitFesta; 
		this.tipoReserva = tipoReserva;
		this.valorReserva = valorReserva;
	}
}
	