import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AccountRoutingModule} from "@pages/account/account.routing-module";

@NgModule({
  declarations: [],
  imports: [
    AccountRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
