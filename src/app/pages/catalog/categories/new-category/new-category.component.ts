import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable, share, startWith, Subject, switchMap } from 'rxjs';

import { TuiAlertService } from '@taiga-ui/core';
import { tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';

import { DefaultLinkModel, CategoryActionModel } from '@core/models';
import { CUSTOM_COLORS } from '@core/helpers/constants';
import { CategoriesService } from '@pages/catalog/categories';

@Component({
  selector: 'app-new-category',
  templateUrl: 'new-category.component.html',
  styleUrl: 'new-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCategoryComponent {
  activeIndex = 0;
  photo: File | null = null;
  imageURL: string | ArrayBuffer | null = null;

  saveLoader = false;

  refresh$ = new Subject<void>();
  search$ = new BehaviorSubject<string>('');
  request$: Observable<DefaultLinkModel[] | []>;
  loading$: Observable<boolean>;
  data$: Observable<DefaultLinkModel[]>;

  readonly items = CUSTOM_COLORS;
  readonly generalFormGroup: FormGroup<CategoryActionModel>;

  constructor(
    private readonly categoriesService: CategoriesService, 
    private readonly router: Router,
    private readonly alerts: TuiAlertService
  ) {
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

    this.request$ = combineLatest([this.search$]).pipe(
      switchMap(([search]) => this.categoriesService.getDefaultLinks(search)),
      share()
    );

    this.loading$ = this.request$.pipe(map(tuiIsFalsy));

    this.data$ = this.request$.pipe(filter(tuiIsPresent), startWith([]));
  }

  onDefaultLinkSearch(value: string | null): void {
    this.search$.next(value ?? '');
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }

  onCategoryPhotoChange(photo: File): void {
    this.photo = photo;

    const reader = new FileReader();
    reader.onload = () => (this.imageURL = reader.result);
    reader.readAsDataURL(photo);
  }

  onCategoryPhotoReject(photo: any): void {
    console.log('Reject', photo);
  }

  onCategoryPhotoRemoved(): void {
    this.photo = null;
  }

  stringifyPlacement(item: DefaultLinkModel): string {
    return item.defaultLink ?? "";
  }

  onSaveAndContinue(): void {
    console.log(this.generalFormGroup);
  }

  onSave(): void {
    if (!this.generalFormGroup.valid) {
      return;
    }

    const formData = new FormData();

    if (this.generalFormGroup.value.name) formData.append('name', this.generalFormGroup.value.name);

    if (this.generalFormGroup.value.defaultLink)
      formData.append('defaultLink', this.generalFormGroup.value.defaultLink);

    if (this.generalFormGroup.value.badgeText) formData.append('badgeText', this.generalFormGroup.value.badgeText);

    if (this.generalFormGroup.value.badgeStyle) formData.append('badgeStyle', this.generalFormGroup.value.badgeStyle);

    if (this.generalFormGroup.value.description)
      formData.append('description', this.generalFormGroup.value.description);

    if (this.generalFormGroup.value.ico) formData.append('ico', this.generalFormGroup.value.ico);

    if (this.generalFormGroup.value.displayOrder)
      formData.append('displayOrder', this.generalFormGroup.value.displayOrder.toString());

    if (this.generalFormGroup.value.isPublished)
      formData.append('isPublished', this.generalFormGroup.value.isPublished.toString());

    if (this.generalFormGroup.value.showOnHomePage)
      formData.append('showOnHomePage', this.generalFormGroup.value.showOnHomePage.toString());

    if (this.photo) {
      formData.append('photo', this.photo);
      formData.append('folder', 'categories');
    }

    this.categoriesService.createNewCategory(formData)
      .subscribe(() => {
        this.alerts.open('Успешно Создано!', { status: 'success' }).subscribe();
      });
  }
}
