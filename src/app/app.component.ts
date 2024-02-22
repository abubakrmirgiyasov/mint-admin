import { Component, HostBinding, isDevMode } from '@angular/core';
import { delay, distinctUntilChanged, map, Observable, share, startWith } from 'rxjs';

import { TuiBrightness } from '@taiga-ui/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { ThemeService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Mint';

  loaderValue$: Observable<number>;
  night$ = this.night.pipe(
    startWith(null),
    map(() => this.night.value),
    distinctUntilChanged(),
    share()
  );

  readonly isDev: boolean;

  constructor(
    private readonly loader: LoadingBarService,
    private readonly night: ThemeService
  ) {
    this.loaderValue$ = loader.value$.pipe(delay(0));

    this.isDev = isDevMode();
  }

  @HostBinding('attr.data-mode')
  get mode(): TuiBrightness | null {
    return this.night.value ? 'onDark' : 'onLight';
  }
}
