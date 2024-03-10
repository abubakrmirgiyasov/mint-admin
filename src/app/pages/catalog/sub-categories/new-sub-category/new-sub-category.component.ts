import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, filter, map, share, startWith, switchMap } from 'rxjs';

import { tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';

import { CategorySampleModel, DefaultLinkModel, SubCategoriesActionModel } from '@core/models';
import { CategoriesService } from '@pages/catalog/categories';
import { SubCategoriesService } from '@pages/catalog/sub-categories';

@Component({
  selector: 'app-new-sub-category',
  templateUrl: './new-sub-category.component.html',
  styleUrl: './new-sub-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSubCategoryComponent {
  activeIndex = 0;

  readonly generalFormGroup: FormGroup<SubCategoriesActionModel>;

  categoryRequest$: Observable<CategorySampleModel[] | []>;
  categoryData$: Observable<CategorySampleModel[]>;
  categorySearch$ = new BehaviorSubject<string>('');

  loading$: Observable<boolean>;

  defaultLinkRequest$: Observable<DefaultLinkModel[] | []>;
  defaultLinkData$: Observable<DefaultLinkModel[]>;
  defaultLinkSearch$ = new BehaviorSubject<string>('');

  categoryByIdRequest$: Observable<CategorySampleModel[]>;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService
  ) {
    this.categoryRequest$ = combineLatest([this.categorySearch$]).pipe(
      switchMap(([search]) => this.categoriesService.getCommonCategories(search)),
      share()
    );

    this.defaultLinkRequest$ = combineLatest([this.defaultLinkSearch$]).pipe(
      switchMap(([search]) => this.subCategoriesService.getDefaultLinks(search)),
      share()
    );

    this.categoryByIdRequest$ = combineLatest([this.router.params]).pipe(
      switchMap(([params]) => this.categoriesService.getCommonCategoryById(params['categoryId'])),
      share()
    );

    this.loading$ = this.categoryRequest$.pipe(map(tuiIsFalsy));

    this.categoryData$ = this.categoryRequest$.pipe(
      filter(tuiIsPresent),
      startWith([]) 
    );

    this.defaultLinkData$ = this.defaultLinkRequest$.pipe(
      filter(tuiIsPresent),
      startWith([])
    );

    this.generalFormGroup = new FormGroup<SubCategoriesActionModel>({
      displayOrder: new FormControl(0),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(3)]
      }),
      defaultLink: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(60), Validators.minLength(3)]
      }),
      fullName: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required, Validators.maxLength(400), Validators.minLength(3)]
      }),
      categoryId: new FormControl({ value: '', disabled: true }, {
        nonNullable: true,
        validators: [Validators.required],
      })
    });
  }

  onCategoryBoxSearch(value: string | null): void {
    this.categorySearch$.next(value ?? '');
  }

  stringifyPlacement(item: CategorySampleModel): string {
    return item.label ?? "";
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }

  onSaveSubCategoryClick(): void {
    if (!this.generalFormGroup.valid) {
      return;
    }

    this.subCategoriesService
      .createSubCategory(this.generalFormGroup.value)
      .subscribe();
  }
}
