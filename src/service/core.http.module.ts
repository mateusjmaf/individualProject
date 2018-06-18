import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerHttpService } from './server.http.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    ServerHttpService
  ],

})

export class CoreModule { }
