import {NgModule} from "@angular/core";
import {SignInComponent} from "./sign-in.component";
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
  TuiErrorModule, TuiNotificationModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {SharedModule} from "@shared/shared.module";
import {RouterLink} from "@angular/router";
import {SignInService} from "@pages/auth/sign-in/sign-in.service";

@NgModule({
  declarations: [SignInComponent],
  imports: [
    SharedModule,

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
  providers: [SignInService],
  exports: [SignInComponent]
})
export class SignInModule { }
