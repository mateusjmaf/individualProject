import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExpenseService } from './expense.service';
import { HttpModule } from '@angular/http';
import { ServerHttpService } from './server.http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    ServerHttpService,
    ExpenseService
  ],

})

export class CoreModule { }
