import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TuiRootModule} from "@taiga-ui/core";

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    TuiRootModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
