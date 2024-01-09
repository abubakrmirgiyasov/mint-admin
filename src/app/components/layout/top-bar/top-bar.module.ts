import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {TuiButtonModule, TuiDropdownModule, TuiRootModule, TuiSvgModule} from "@taiga-ui/core";

import {TopBarComponent} from "./top-bar.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    TuiRootModule,
    TuiButtonModule,
    TuiDropdownModule,
    RouterLink,
    TuiSvgModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TopBarComponent]
})
export class TopBarModule { }
