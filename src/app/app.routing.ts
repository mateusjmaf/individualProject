import { Routes, RouterModule  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { ClientComponent } from './client/client.component';
import { KitPartyComponent } from './kitParty/kit-party.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ReportsComponent } from './reports/reports.component';
import { ReserveComponent } from './reserve/reserve.component';
import { StaffComponent } from './staff/staff.component';
import { CashFlowComponent } from './cashFlow/cash-flow.component';
import { HomeComponent } from './home/home.component';
// import { CalendarComponent } from './calendar/calendar.component';

const app_routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'client', component: ClientComponent },
    { path: 'cashFlow', component: CashFlowComponent },
    { path: 'kitParty', component: KitPartyComponent },
    { path: 'product', component: ProductComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'report', component: ReportsComponent },
    // { path: 'calendar', component: CalendarComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
