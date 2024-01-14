import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {RouterLink} from "@angular/router";
import {
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule, TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputPasswordModule, TuiInputPhoneInternationalModule, TuiIslandModule, TuiSelectModule
} from "@taiga-ui/kit";
import {TuiAutoFocusModule, TuiElementModule, TuiLetModule} from "@taiga-ui/cdk";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {SignInComponent} from "@pages/auth/sign-in/sign-in.component";
import {IdentityRoutingModule} from "@pages/auth/identity-routing.module";

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    SharedModule,

    IdentityRoutingModule,

    RouterLink,
    TuiInputModule,
    TuiAutoFocusModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputPasswordModule,
    TuiCheckboxLabeledModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFilterByInputPipeModule,
    TuiElementModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiLetModule,
    TuiInputPhoneInternationalModule,
    TuiNotificationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IdentityModule { }
