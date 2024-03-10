import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, share, startWith, switchMap } from 'rxjs';

import { tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

import { CategorySampleModel, PaginatedResultModel, SubCategoryModel } from '@core/models';
import { combineReload } from '@shared/utils';
import { SelectCategoryDialogService } from '@components/dialogs';
import { CategoriesService } from '@pages/catalog/categories';
import { SubCategoriesService } from '@pages/catalog/sub-categories';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubCategoriesComponent {
  readonly columns = [
    'index', 
    'name', 
    'defaultLink', 
    'category', 
    'fullName',
    'actions',
  ];

  protected isNewSubCategoryVisible = false;

  readonly categoryControl: FormControl;

  readonly subCategoriesRequest$: Observable<PaginatedResultModel<SubCategoryModel> | null>;
  readonly subCategoriesData$: Observable<SubCategoryModel[]>;
  readonly subCategoriesTotalCount$: Observable<number>;

  readonly categoriesRequest$: Observable<CategorySampleModel[] | []>;
  readonly categorySearch$ = new BehaviorSubject<string>('');

  readonly loading$: Observable<boolean>;

  readonly search$ = new BehaviorSubject<string>('');
  readonly pagination$ = new BehaviorSubject({ page: 0, size: 25 });
  private readonly refresh$ = new Subject<void>();

  constructor(
    private readonly promptService: SelectCategoryDialogService,
    private readonly categoryService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService
  ) {
    this.categoryControl = new FormControl();

    this.subCategoriesRequest$ = combineReload(
      combineLatest(
        [this.search$, this.pagination$]),
        this.refresh$
      ).pipe(
        switchMap(([search, pagination]) => 
          this.subCategoriesService
            .getSubCategories(search, pagination.page, pagination.size)
            .pipe(startWith(null))
        ),
        share()
      );

    this.loading$ = this.subCategoriesRequest$.pipe(map(tuiIsFalsy));

    this.subCategoriesTotalCount$ = this.subCategoriesRequest$.pipe(
      filter(tuiIsPresent),
      map((x) => x.totalCount),
      startWith(1)
    );

    this.subCategoriesData$ = this.subCategoriesRequest$.pipe(
      filter(tuiIsPresent),
      map((x) => x.items),
      startWith([])
    );

    this.categoriesRequest$ = combineLatest(this.categorySearch$).pipe(
      switchMap(([search]) => this.categoryService.getCommonCategories(search).pipe(startWith([]))),
      share()
    );
  }

  applySearch(value: string): void {
    this.search$.next(value);
  }

  refresh(): void {
    this.refresh$.next();
  }

  onPaginationChange(pagination: any): void {
    
  }

  onShowButton(value: boolean): void {
    this.isNewSubCategoryVisible = value;
  }

  showCategoriesClick(content: PolymorpheusContent): void {
    this.promptService
      .open(content, {
        heading: 'Выберите категорию',
        buttons: ['Перейти', 'Отмена'],
        isValid: this.categoryControl.valid,
        value: this.categoryControl
      })
      .subscribe();
  }

  onCategoryBoxSearch(value: string | null): void {
    this.categorySearch$.next(value ?? "");
  }

  stringifyPlacement(item: CategorySampleModel): string {
    return item.label ?? "";
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }
}
