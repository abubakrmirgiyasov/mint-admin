import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, share, startWith, switchMap } from 'rxjs';

import { TuiDialogService, TuiDurationOptions, tuiHeightCollapse } from '@taiga-ui/core';
import { tuiIsFalsy, tuiIsPresent, tuiPure } from '@taiga-ui/cdk';
import { TuiTablePagination } from '@taiga-ui/addon-table';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { ManufactureModel, PaginatedResultModel } from '@core/models';
import { combineReload } from '@shared/utils';
import {
  DeleteManufactureComponent,
  DeleteManufactureComponentData,
  ManufacturesService,
} from '@pages/catalog/manufactures';

type SortDirection = -1 | 1;

type ColumnKey = 
  | 'displayOrder'
  | 'name'
  | 'country'
  | 'fullAddress'
  | 'website'
  ;

const COLUMN_KEYS: Record<string, ColumnKey> = {
  'Отобразить в порядке': 'displayOrder',
  'Название': 'name',
  'Страна': 'country', 
  'Полный адрес': 'fullAddress',
  'Веб-сайт': 'website'
};

@Component({
  selector: 'app-manufactures',
  templateUrl: 'manufactures.component.html',
  styleUrl: 'manufactures.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiHeightCollapse],
})
export class ManufacturesComponent {
  protected isSettingOpen = false;
  protected isNewManufactureVisible = false;

  protected readonly expanded = new SelectionModel<ManufactureModel>();

  protected readonly request$: Observable<PaginatedResultModel<ManufactureModel> | null>;
  protected readonly loading$: Observable<boolean>;
  protected readonly total$: Observable<number>;
  protected readonly data$: Observable<ManufactureModel[]>;

  protected readonly search$ = new BehaviorSubject<string>('');
  protected readonly pagination$ = new BehaviorSubject<TuiTablePagination>({ page: 0, size: 25 });

  private readonly refresh$ = new Subject<void>();

  protected readonly columnsItems$ = new BehaviorSubject<readonly string[]>(Object.keys(COLUMN_KEYS));
  protected readonly enabledColumns$ = new BehaviorSubject<readonly string[]>(Object.keys(COLUMN_KEYS));

  protected readonly columns$ = combineLatest([this.columnsItems$, this.enabledColumns$]).pipe(
    map(([columnsItems, enabledColumns]) => {
      const columns = columnsItems
        .filter((column) => enabledColumns.includes(column))
        .map((column) => COLUMN_KEYS[column]);

      return [...columns, 'actions'];
    })
  );

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
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
    this.pagination$.next(pagination);
  }

  showDialog(manufactureId: string): void {
    const content = new PolymorpheusComponent(DeleteManufactureComponent);
    const data: DeleteManufactureComponentData = {
      manufactureId: manufactureId,
    };

    this.dialogs
      .open(content, {
        data,
        label: 'Удаление производителя',
      })
      .subscribe();
  }

  onSettingsOpenClick(): void {
    this.isSettingOpen = !this.isSettingOpen;
  }

  columnsItemsChange(columns: string[]): void {
    this.columnsItems$.next(columns);
  }

  enabledColumnsChange(columns: string[]): void {
    this.enabledColumns$.next(columns);
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } };
  }
}
