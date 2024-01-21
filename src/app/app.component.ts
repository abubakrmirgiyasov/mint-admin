import {Component, HostBinding} from "@angular/core";
import {ThemeService} from "@core/services/theme.service";
import {distinctUntilChanged, map, share, startWith} from "rxjs";
import {TuiBrightness} from "@taiga-ui/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Mint";

  night$ = this.night.pipe(
    startWith(null),
    map(() => this.night.value),
    distinctUntilChanged(),
    share()
  );

  constructor(
    private readonly night: ThemeService
  ) { }

  @HostBinding('attr.data-mode')
  get mode(): TuiBrightness | null {
    return this.night.value ? 'onDark' : 'onLight';
  }
}
