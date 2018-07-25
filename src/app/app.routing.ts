import { Routes, RouterModule  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { AuthGuard } from '../service/auth.guard';

import { ClientComponent } from './client/client.component';
import { KitPartyComponent } from './kitParty/kit-party.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ReserveComponent } from './reserve/reserve.component';
import { StaffComponent } from './staff/staff.component';
import { CashFlowComponent } from './cashFlow/cash-flow.component';
import { HomeComponent } from './home/home.component';
// import { CalendarComponent } from './calendar/calendar.component';

const app_routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
    { path: 'cashFlow', component: CashFlowComponent, canActivate: [AuthGuard] },
    { path: 'kitParty', component: KitPartyComponent, canActivate: [AuthGuard] },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'reserve', component: ReserveComponent, canActivate: [AuthGuard] },
    { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
    // { path: 'calendar', component: CalendarComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
