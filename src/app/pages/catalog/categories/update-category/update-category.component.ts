import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { ICONS } from '@core/helpers';
import { CategoryActionModel, CategoryModel } from '@core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-category',
  templateUrl: 'update-category.component.html',
  styleUrl: 'update-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateCategoryComponent {
  protected readonly icons = Object.entries(ICONS);

  protected activeIndex = 0;
  protected saveLoader = false;

  protected generalFormGroup: FormGroup<CategoryActionModel>;
  protected readonly categoryId: string | null;

  protected readonly data$: Observable<CategoryModel>;
  protected data!: CategoryModel;
  protected loading!: boolean;

  items = [];

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly alerts: TuiAlertService,
    private readonly router: ActivatedRoute,
    private readonly route: Router
  ) {
    this.categoryId = router.snapshot.paramMap.get('categoryId');

    if (this.categoryId === null) {
      this.route.navigate(['/catalog/categories']);
    }

    this.data$ = this.categoriesService.getCategoryById(this.categoryId!);

    this.data$.subscribe(() => {
      this.loading = false;
    });

    this.generalFormGroup = new FormGroup<CategoryActionModel>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100), Validators.minLength(3)],
      }),
      displayOrder: new FormControl(0),
      defaultLink: new FormControl('', {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      badgeText: new FormControl('', {
        nonNullable: false,
        validators: [Validators.maxLength(30), Validators.minLength(3)],
      }),
      badgeStyle: new FormControl('', {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      description: new FormControl('', {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      ico: new FormControl('', { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      isPublished: new FormControl(false, {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      showOnHomePage: new FormControl(false, {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      photo: new FormControl([]),
      products: new FormControl([], {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      subCategories: new FormControl([], {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
      categoryTags: new FormControl([], {
        nonNullable: false,
        validators: [Validators.maxLength(60), Validators.minLength(3)],
      }),
    });

    this.categoryId
  }

  onSave(): void {
    if (!this.generalFormGroup.valid) {
      return;
    }

    this.saveLoader = true;

  }

  onSaveAndContinue(): void {
    if (!this.generalFormGroup.valid) {
      return;
    }

    this.saveLoader = true;

  }
}
