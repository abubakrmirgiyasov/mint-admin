import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, combineLatest, filter, map, Observable, share, startWith, Subject, switchMap } from "rxjs";
import { SelectionModel } from '@angular/cdk/collections';

import { TuiDurationOptions, tuiHeightCollapse } from "@taiga-ui/core";
import { tuiIsFalsy, tuiIsPresent, tuiPure } from "@taiga-ui/cdk";
import { TuiTablePagination } from "@taiga-ui/addon-table";

import { CategoryModel, PaginatedResultModel } from "@core/models";
import { CategoriesService } from "@pages/catalog/categories";
import { combineReload } from "@shared/utils/rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrl: 'categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiHeightCollapse],
})
export class CategoriesComponent {
  readonly columns = [
    'displayOrder',
    'photo',
    'name',
    'ico',
    'badgeText',
    'defaultLink',
    'subCategories',
    'actions',
  ];

  protected isNewCategoryVisible = false;
  isActionsClickOpened = false;

  expanded = new SelectionModel<CategoryModel>();

  readonly request$: Observable<PaginatedResultModel<CategoryModel> | null>;
  readonly loading$: Observable<boolean>;
  readonly total$: Observable<number>;
  readonly data$: Observable<CategoryModel[]>;

  readonly search$ = new BehaviorSubject<string>('');
  readonly pagination$ = new BehaviorSubject({ page: 0, size: 25 });

  private readonly refresh$ = new Subject<void>();

  constructor(
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
    console.log("test");
    // this.pagination$.next(pagination);
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

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return { value: '', params: { duration } };
  }
}
