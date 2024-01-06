import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputPasswordModule, TuiInputPhoneInternationalModule,
  TuiIslandModule, TuiSelectModule
} from "@taiga-ui/kit";
import {TuiAutoFocusModule, TuiElementModule, TuiLetModule} from "@taiga-ui/cdk";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiRootModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {SharedModule} from "../../../shared/shared.module";
import {RouterLink} from "@angular/router";
import {AuthService} from "@pages/auth/sign-in/auth.service";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,

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
    RouterLink,
    TuiRootModule,
    TuiInputPhoneInternationalModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
