import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "@pages/dashboards/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboards/dashboard.module')
      .then((i) => i.DashboardModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then((i) => i.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
