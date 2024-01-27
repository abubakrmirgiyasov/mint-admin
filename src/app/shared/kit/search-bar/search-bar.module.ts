import {NgModule} from "@angular/core";
import {SearchBarComponent} from "@shared/kit/search-bar/search-bar.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiModeModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiAutoFocusModule} from "@taiga-ui/cdk";

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule,
    TuiModeModule,
  ],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
