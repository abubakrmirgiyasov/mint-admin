import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {LayoutComponent} from "@components/layout/layout.component";
import {
  TuiButtonModule,
  TuiDropdownModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from "@taiga-ui/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TopBarComponent} from "@components/layout/top-bar/top-bar.component";
import {SidebarComponent} from "@components/layout/sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {TuiAccordionModule, TuiMarkerIconModule} from "@taiga-ui/kit";

@NgModule({
  declarations: [
    LayoutComponent,
    TopBarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,

    TuiButtonModule,
    TuiDropdownModule,
    RouterLink,
    TuiSvgModule,
    RouterOutlet,
    TuiScrollbarModule,
    TranslateModule,
    TuiMarkerIconModule,
    TuiAccordionModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LayoutComponent]
})
export class LayoutModule { }
