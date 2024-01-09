import {NgModule} from "@angular/core";
import {IdentityRoutingModule} from "./identity-routing.module";
import {SignInModule} from "./sign-in/sign-in.module";

@NgModule({
  declarations: [],
  imports: [
    IdentityRoutingModule,
    SignInModule
  ]
})
export class IdentityModule { }
