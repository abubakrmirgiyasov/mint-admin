import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TuiAlertModule,
  TuiDialogModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiProgressModule } from '@taiga-ui/kit';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { APP_PROVIDERS } from './app.providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogsModule } from '@components/dialogs';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),

    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Loading bar
    LoadingBarModule,
    LoadingBarHttpClientModule,

    // Taiga UI
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiLetModule,
    TuiProgressModule,
    TuiLoaderModule,

    DialogsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: APP_PROVIDERS,
})
export class AppModule {}
