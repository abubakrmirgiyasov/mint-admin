import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "@pages/dashboards/dashboard.component";
import {CrmComponent} from "@pages/dashboards/crm/crm.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: 'crm',
    component: CrmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
