import {NgModule} from "@angular/core";
import {TuiButtonModule} from "@taiga-ui/core";

import {TopBarComponent} from "./top-bar.component";

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    TuiButtonModule
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
