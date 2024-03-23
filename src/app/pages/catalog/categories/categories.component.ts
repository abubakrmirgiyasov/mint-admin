import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { BehaviorSubject, combineLatest, filter, map, Observable, share, startWith, Subject, switchMap } from "rxjs";
import { SelectionModel } from '@angular/cdk/collections';

import { TuiDialogService, TuiDurationOptions, tuiHeightCollapse } from "@taiga-ui/core";
import { tuiIsFalsy, tuiIsPresent, tuiPure } from "@taiga-ui/cdk";
import { TuiTablePagination } from "@taiga-ui/addon-table";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { CategoryModel, PaginatedResultModel } from "@core/models";
import { CategoriesService, DeleteCategoryComponent, DeleteCategoryComponentData } from "@pages/catalog/categories";
import { combineReload } from "@shared/utils/rxjs";

type SortDirection = -1 | 1;

type ColumnKey = 
  | 'displayOrder'
  | 'name'
  | 'badgeText'
  | 'defaultLink'
  ;

const COLUMN_KEYS: Record<string, ColumnKey> = {
  'Отобразить в порядке': 'displayOrder',
  'Название': "name",
  'Значок': 'badgeText',
  'Путь': 'defaultLink'
};

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrl: 'categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiHeightCollapse],
})
export class CategoriesComponent {
  protected isNewCategoryVisible = false;
  protected isActionsClickOpened = false;
  protected isSettingsOpen = false;

  protected readonly expanded = new SelectionModel<CategoryModel>();

  protected readonly request$: Observable<PaginatedResultModel<CategoryModel> | null>;
  protected readonly loading$: Observable<boolean>;
  protected readonly total$: Observable<number>;
  protected readonly data$: Observable<CategoryModel[]>;

  protected readonly search$ = new BehaviorSubject<string>('');
  protected readonly pagination$ = new BehaviorSubject({ page: 0, size: 25 });

  private readonly refresh$ = new Subject<void>();

  protected columnsItems$ = new BehaviorSubject<readonly string[]>(Object.keys(COLUMN_KEYS));
  protected enabledColumns$ = new BehaviorSubject<readonly string[]>(Object.keys(COLUMN_KEYS));

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
    private readonly categoriesService: CategoriesService
  ) {
    this.request$ = combineReload(
      combineLatest([
        this.search$,
        this.pagination$
      ]),
      this.refresh$
    ).pipe(
      switchMap(([search, pagination]) =>
        this.categoriesService
          .getCategories(search, pagination.page, pagination.size)
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
    this.search$.next(value);
  }

  refresh(): void {
    this.refresh$.next();
  }

  onPaginationChange(pagination: any): void {
    this.pagination$.next(pagination);
  }

  onShowButton(value: boolean): void {
    this.isNewCategoryVisible = value;
  }

  onActionsClick(): void {
    this.isActionsClickOpened = !this.isActionsClickOpened;
  }

  onObscured(obscured: any): void {
    if (obscured) {
      this.isActionsClickOpened = false;
    }
  }

  onActiveZone(active: any): void {
    this.isActionsClickOpened = active && this.isActionsClickOpened;
  }

  showDialog(categoryId: string): void {
    const content = new PolymorpheusComponent(DeleteCategoryComponent);
    const data: DeleteCategoryComponentData = {
      categoryId: categoryId,
    };

    this.dialogs
      .open(content, {
        data,
        label: 'Удаление котегории'
      })
      .subscribe();
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
