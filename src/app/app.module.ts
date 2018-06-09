import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './../service/core.http.module';

import { AdditionalComponent } from './additional/additional.component';
import { CardComponent } from './card/card.component';
import { CashFlowComponent } from './cashFlow/cash-flow.component';
import { ClientComponent } from './client/client.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { KitPartyComponent } from './kitParty/kit-party.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { ProductComponent } from './product/product.component';
import { ReportsComponent } from './reports/reports.component';
import { ReserveComponent } from './reserve/reserve.component';
import { StaffComponent } from './staff/staff.component';

import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { CalendarComponent } from './calendar/calendar.component';
// import { CalendarModule } from './calendar/calendar.module';

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
    ProductComponent,
    ReportsComponent,
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
    ModalModule.forRoot(),
    // NgbModule.forRoot(),
    // CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
