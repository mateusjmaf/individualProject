import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.object';
import { ServerHttpService } from '../../service/server.http.service';

@Injectable()
export class AuthService {

  showMenuEmitter = new EventEmitter<boolean>();

  private authUser = false;

  constructor(private router: Router, private serverHttp: ServerHttpService) { }

  loginRequest(user: User) {

    // if (this.getUserAuth(user)) {
    if (user.name === 'tst' && user.password === 'tst') {
      this.authUser = true;
      this.showMenuEmitter.emit(true);
      this.router.navigate(['/']);
      return true;

    } else {
      this.authUser = false;
      this.showMenuEmitter.emit(false);
      this.router.navigate(['/login']);
      return false;

    }
  }

  isAuthenticatedUser() {
    return this.authUser;
  }

  private getUserAuth(user: User) {
    this.serverHttp.readByParam(user, 'userRest/buscarUsuario').subscribe(response => {
      return response;
    });
  }

}