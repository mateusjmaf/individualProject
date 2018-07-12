import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user.object';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private user = new User();

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.loginRequest(this.user);
  }

}
