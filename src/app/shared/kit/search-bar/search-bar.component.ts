import {ChangeDetectionStrategy, Component, Input, Output} from "@angular/core";
import {TuiDurationOptions, tuiFadeIn} from "@taiga-ui/core";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {tuiPure} from "@taiga-ui/cdk";

const DEBOUNCE_TIME = 500;

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrl: 'search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class SearchBarComponent {
  @Output()
  valueChange: Observable<string>;

  @Input()
  set value(value: string) {
    this.searchControl.setValue(value);
  }

  get value(): string {
    return this.searchControl.value;
  }

  readonly isSearchShown$: Observable<boolean>;
  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  constructor() {
    this.searchControl.disable();

    this.valueChange = this.searchControl.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged()
    );

    this.isSearchShown$ = this.searchControl.statusChanges.pipe(
      map((status) => status !== 'DISABLED'),
      distinctUntilChanged(),
      startWith(false)
    )
  }

  open(): void {
    this.searchControl.enable();
  }

  close(): void {
    this.searchControl.setValue('');
    this.searchControl.disable();
  }

  @tuiPure
  getSearchBarAnimation(duration: number): TuiDurationOptions {
    return {
      value: '',
      params: { duration },
    };
  }
}
