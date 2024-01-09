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
import {TopBarModule} from "@components/layout/top-bar/top-bar.module";
import {SidebarComponent} from "@components/layout/sidebar/sidebar.component";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SignInModule} from "@pages/auth/sign-in/sign-in.module";

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
    TuiLoaderModule,

    SignInModule,
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
