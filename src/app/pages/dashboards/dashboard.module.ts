import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {DashboardRoutingModule} from "@pages/dashboards/dashboard.routing-module";

@NgModule({
  declarations: [],
  imports: [
    DashboardRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
