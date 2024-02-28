import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, combineLatest, map, share, startWith, switchMap } from 'rxjs';

import { tuiIsFalsy } from '@taiga-ui/cdk';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

import { CategorySampleModel, SubCategoryModel } from '@core/models';
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
  readonly columns = ['name', 'defaultLink', 'category', 'fullName'];

  isNewSubCategoryVisible = false;

  readonly categoryControl: FormControl;

  readonly subCategoriesRequest$: Observable<SubCategoryModel[] | []>;

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
        switchMap(([search]) => 
          this.subCategoriesService
            .getSubCategories(search)
            .pipe(startWith([]))
        ),
        share()
      );

    this.loading$ = this.subCategoriesRequest$.pipe(map(tuiIsFalsy));

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

  onShowButton(value: boolean): void {
    this.isNewSubCategoryVisible = value;
  }

  showCategoriesClick(content: PolymorpheusContent): void {
    this.promptService
      .open(content, {
        heading: 'Выберите категорию',
        buttons: ['Перейти', 'Отмена'],
        isValid: this.categoryControl.valid,
        value: this.categoryControl.value
      })
      .subscribe();
  }
}
