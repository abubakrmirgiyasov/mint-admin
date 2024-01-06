import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./sign-in/auth.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: 'sign-in',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
