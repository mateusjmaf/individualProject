import { Component, OnInit } from '@angular/core';

import { ServerHttpService } from '../../service/server.http.service';
import { Observable } from 'rxjs/Observable';

import { Card } from './card.object';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  card: Card;
  cardList: Card[];
  cardSearchValue = 0;
  restRoute = 'cardapioRest';

  constructor(private serverHttp: ServerHttpService) {
    this.card = new Card();
  }

  ngOnInit() {
    this.searchcard();
  }

  onSubmit() { }

  searchcard() {
    return this.serverHttp.readById(this.cardSearchValue, this.restRoute + '/buscarCardapioPorIdReserva').subscribe(response => {
      response.length > 0 ? this.cardList = response : this.cardList = undefined;
    });
  }

  editcard(Card: Card) {
    this.card = Card;
  }
}
