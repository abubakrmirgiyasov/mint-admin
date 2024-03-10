import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, share, startWith, switchMap } from 'rxjs';

import { tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';
import { TuiTablePagination } from '@taiga-ui/addon-table';

import { ManufactureModel, PaginatedResultModel } from '@core/models';
import { combineReload } from '@shared/utils';
import { ManufacturesService } from '@pages/catalog/manufactures';

@Component({
  selector: 'app-manufactures',
  templateUrl: 'manufactures.component.html',
  styleUrl: 'manufactures.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManufacturesComponent {
  readonly columns: string[] = [
    'displayOrder',
    'name',
    'fullAddress',
    'website',
    'actions'
  ];

  protected isNewManufactureVisible = false;

  readonly request$: Observable<PaginatedResultModel<ManufactureModel> | null>;
  readonly loading$: Observable<boolean>;
  readonly total$: Observable<number>;
  readonly data$: Observable<ManufactureModel[]>;

  readonly search$ = new BehaviorSubject<string>('');
  readonly pagination$ = new BehaviorSubject<TuiTablePagination>({ page: 0, size: 25 });

  private readonly refresh$ = new Subject<void>();

  constructor(
    private readonly manufacturesService: ManufacturesService
  ) {
    this.request$ = combineReload(
      combineLatest([this.search$, this.pagination$]),
      this.refresh$
    ).pipe(
      switchMap(([search, pagination]) => 
        this.manufacturesService
          .getManufactures(search, pagination.page, pagination.size)
          .pipe(startWith(null))
      ),
      share()
    );

    this.loading$ = this.request$.pipe(map(tuiIsFalsy));

    this.total$ = this.request$.pipe(
      filter(tuiIsPresent),
      map((x) => x.totalCount),
      startWith(1)
    );

    this.data$ = this.request$.pipe(
      filter(tuiIsPresent),
      map((x) => x.items),
      startWith([])
    );
  }

  applySearch(value: string): void {
    this.search$.next(value ?? '');
  }

  refresh(): void {
    this.refresh$.next();
  }

  onShowButton(value: boolean): void {
    this.isNewManufactureVisible = value;
  }

  onPaginationChange(pagination: any): void {
    console.log(pagination);
    this.pagination$.next(pagination);
  }
}
