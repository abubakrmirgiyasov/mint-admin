import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {
  TuiAlertModule,
  TuiDialogModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule
} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiProgressModule} from "@taiga-ui/kit";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LayoutModule} from "@components/layout/layout.module";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Taiga UI
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiLetModule,
    TuiProgressModule,
    TuiLoaderModule

  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
