import {NgModule} from "@angular/core";
import {IdentityRoutingModule} from "./identity-routing.module";
import {AuthModule} from "./sign-in/auth.module";

@NgModule({
  declarations: [],
  imports: [
    IdentityRoutingModule,
    AuthModule
  ]
})
export class IdentityModule { }
