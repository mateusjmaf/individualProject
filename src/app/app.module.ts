import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CoreModule } from './../service/core.http.module';
import { AuthGuard } from '../service/auth.guard';
import { AuthService } from './login/auth.service';

import { AdditionalComponent } from './additional/additional.component';
import { CardComponent } from './card/card.component';
import { CashFlowComponent } from './cashFlow/cash-flow.component';
import { ClientComponent } from './client/client.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { KitPartyComponent } from './kitParty/kit-party.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { ReserveComponent } from './reserve/reserve.component';
import { StaffComponent } from './staff/staff.component';

@NgModule({
  declarations: [
    AppComponent,
    AdditionalComponent,
    CardComponent,
    CashFlowComponent,
    ClientComponent,
    ExpenseComponent,
    HomeComponent,
    KitPartyComponent,
    LoginComponent,
    ModalComponent,
    NavbarComponent,
    ProductComponent,
    ReserveComponent,
    StaffComponent,
    // CalendarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CoreModule,
    TabsModule.forRoot(),
  ],
  providers: [
    CoreModule,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
