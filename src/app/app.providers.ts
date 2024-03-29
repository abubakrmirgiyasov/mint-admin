import { ErrorHandler, LOCALE_ID, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { of } from 'rxjs';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

import { tuiSvgSrcInterceptors } from '@taiga-ui/core';
import { TuiSafeHtml } from '@taiga-ui/cdk';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';

import { AuthInterceptor } from '@core/guards/auth.interceptor';
import { GlobalErrorHandler } from '@core/error-handler';


export const APP_PROVIDERS: Provider[] = [
  {
    provide: LOCALE_ID,
    useValue: 'ru',
  },
  {
    provide: TUI_LANGUAGE,
    useValue: of(TUI_RUSSIAN_LANGUAGE),
  },
  {
    provide: LOADING_BAR_CONFIG,
    useValue: { latencyThreshold: 100 },
  },
  { provide: ErrorHandler, useClass: GlobalErrorHandler },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  provideLottieOptions({
    player: () => player
  }),
  tuiSvgSrcInterceptors((src: TuiSafeHtml) => {
    const srcAsStr = String(src);
    if (srcAsStr.startsWith('mat::')) {
      const iconName = srcAsStr.replace('mat::', '');
      return `assets/icons/material/${iconName}.svg#${iconName}`;
    }
    return src;
  }),
];
