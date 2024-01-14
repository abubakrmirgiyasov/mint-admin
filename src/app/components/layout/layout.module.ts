import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {LayoutComponent} from "@components/layout/layout.component";
import {TuiButtonModule, TuiDropdownModule, TuiRootModule, TuiSvgModule} from "@taiga-ui/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TopBarComponent} from "@components/layout/top-bar/top-bar.component";
import {SidebarComponent} from "@components/layout/sidebar/sidebar.component";

@NgModule({
  declarations: [
    LayoutComponent,
    TopBarComponent,
    SidebarComponent
  ],
  imports: [
    TuiRootModule,
    TuiButtonModule,
    TuiDropdownModule,
    RouterLink,
    TuiSvgModule,
    RouterOutlet
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LayoutComponent]
})
export class LayoutModule { }
