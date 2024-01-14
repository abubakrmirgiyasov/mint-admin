import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AccountRoutingModule} from "@pages/account/account.routing-module";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {SettingsComponent} from "@pages/account/settings/settings.component";
import {ProfileComponent} from "@pages/account/profile/profile.component";

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,

    RouterModule,

    AccountRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
