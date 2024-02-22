import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, combineLatest, filter, map, Observable, share, startWith, Subject, switchMap } from "rxjs";

import { tuiIsFalsy, tuiIsPresent } from "@taiga-ui/cdk";
import { TuiTablePagination } from "@taiga-ui/addon-table";

import { CategoryModel, PaginatedResultModel } from "@core/models";
import { CategoriesService } from "@pages/catalog/categories";
import { combineReload } from "@shared/utils/rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrl: 'categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  columns = [
    'displayOrder',
    'photo',
    'name',
    'ico',
    'badgeText',
    'defaultLink',
    'subCategories',
    'actions',
  ];

  // expanded = new SelectionModel
  // isItemSelected: boolean = false;

  readonly request$: Observable<PaginatedResultModel<CategoryModel> | null>;
  readonly loading$: Observable<boolean>;
  readonly total$: Observable<number>;
  readonly data$: Observable<CategoryModel[]>;

  readonly search$ = new BehaviorSubject<string>('');
  readonly pagination$ = new BehaviorSubject({ page: 0, size: 25 });

  private readonly refresh$ = new Subject<void>();

  constructor(
    private readonly categoriesService: CategoriesService,
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

    this.loading$ = this.request$.pipe(map(tuiIsFalsy));
  }

  applySearch(value: string): void {

  }

  refresh(): void {

  }

  onPaginationChange(pagination: any): void {
    console.log("test");
    // this.pagination$.next(pagination);
  }
}
