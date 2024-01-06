import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import { LOCAL_STORAGE, WINDOW } from '@ng-web-apis/common';

const THEME_KEY: string = 'dark_theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BehaviorSubject<boolean> {

  constructor(@Inject(WINDOW) readonly window: Window, @Inject(LOCAL_STORAGE) readonly storage: Storage) {
    super(
      storage.getItem(THEME_KEY) === 'true'
        || !(storage.getItem(THEME_KEY) && window.matchMedia(`(prefers-color-scheme: dark)`).matches)
    );
  }

  override next(night: boolean): void {
    this.storage.setItem(THEME_KEY, String(night));
    super.next(night);
}

  toggle(): void {
    this.next(!this.value);
  }

}
