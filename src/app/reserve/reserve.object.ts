import { Additional } from "../additional/additional.object";
import { Card } from "../card/card.object";
import { Client } from "../client/client.object";
import { KitParty } from "../kitParty/kit-party.object";
import { Time } from "ngx-bootstrap/timepicker/timepicker.models";

export class Reserve {
	
  idReserva: number;
	aniversariante: string;
	cardapios: Array<Card>;
	cliente: Client;
	dataReserva: Date;
	desconto: number;
	horarioReserva: Time;
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
		horarioReserva?: Time,
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
		this.horarioReserva = horarioReserva;
		this.kitFesta = kitFesta; 
		this.tipoReserva = tipoReserva;
		this.valorReserva = valorReserva;
	}
}
	