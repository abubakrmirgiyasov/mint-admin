import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {LayoutComponent} from "@components/layout/layout.component";
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
import {TopBarModule} from "@components/top-bar/top-bar.module";
import {SidebarComponent} from "@components/sidebar/sidebar.component";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthModule} from "@pages/auth/sign-in/auth.module";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Taiga UI
    TuiRootModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiLetModule,
    TuiProgressModule,
    TuiLoaderModule,

    AuthModule,
    TopBarModule
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
