import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "@pages/account/profile/profile.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: ':id',
    component: ProfileComponent
  },
  {
    path: 'settings/:id',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
