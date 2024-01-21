import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";
import {LANGUAGES} from "@core/helpers/constants/languages.constants";

const LANG_KEY = 'lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: string[] = LANGUAGES;

  constructor(
    public translate: TranslateService,
    private cookieService: CookieService
  ) {
    this.translate.addLangs(this.languages);

    const browserLang = this.cookieService.check(LANG_KEY)
      ? this.cookieService.get(LANG_KEY)
      : translate.getBrowserLang();

    if (browserLang) {
      translate.use(
        browserLang.match(/en|es|de|it|ru/) ? browserLang : 'ru'
      );
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.cookieService.set(LANG_KEY, lang);
  }
}
