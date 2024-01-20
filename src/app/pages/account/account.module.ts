import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AccountRoutingModule} from "@pages/account/account.routing-module";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {SettingsComponent} from "@pages/account/settings/settings.component";
import {ProfileComponent} from "@pages/account/profile/profile.component";
import {TuiIslandModule, TuiMarkerIconModule, TuiTabsModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,

    RouterModule,

    AccountRoutingModule,
    TuiMarkerIconModule,
    TuiButtonModule,
    TuiTabsModule,
    TuiIslandModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
