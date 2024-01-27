import {ChangeDetectionStrategy, Component} from "@angular/core";
import {customColors} from "@core/helpers/constants/layout.constants";
import {CategoriesService} from "@pages/catalog/categories/categories.service";
import {BehaviorSubject, combineLatest, filter, map, Observable, share, startWith, Subject, switchMap} from "rxjs";
import {DefaultLinkModel} from "@core/models/catalog/categories/link.model";
import {combineReload} from "@shared/utils/rxjs";
import {tuiIsFalsy, tuiIsPresent} from "@taiga-ui/cdk";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryActionModel} from "@core/models/catalog/categories/category.action.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-new-category',
  templateUrl: 'new-category.component.html',
  styleUrl: 'new-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent {
  activeIndex = 0;

  refresh$ = new Subject<void>();
  search$ = new BehaviorSubject<string>('');
  request$: Observable<DefaultLinkModel[] | []>;
  loading$: Observable<boolean>;
  data$: Observable<DefaultLinkModel[]>;

  readonly items = customColors;
  readonly generalFormGroup: FormGroup<CategoryActionModel>;

  constructor(
    private readonly categoriesService: CategoriesService
  ) {
    this.generalFormGroup = new FormGroup<CategoryActionModel>({
      name: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.minLength(3)] }),
      displayOrder: new FormControl(0),
      defaultLink: new FormControl("", { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      badgeText: new FormControl("", { nonNullable: false, validators: [Validators.maxLength(30), Validators.minLength(3)] }),
      badgeStyle: new FormControl("", { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      description: new FormControl("", { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      ico: new FormControl("", { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      isPublished: new FormControl(false, { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      showOnHomePage: new FormControl(false, { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      photo: new FormControl([], { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      products: new FormControl([], { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      subCategories: new FormControl([], { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] }),
      categoryTags: new FormControl([], { nonNullable: false, validators: [Validators.maxLength(60), Validators.minLength(3)] })
    });

    this.request$ = combineLatest([this.search$]).pipe(
      switchMap(([search]) => this.categoriesService.getDefaultLinks(search)),
      share()
    );

    this.loading$ = this.request$.pipe(map(tuiIsFalsy));

    this.data$ = this.request$.pipe(
      filter(tuiIsPresent),
      startWith([])
    );
  }

  onDefaultLinkSearch(value: string | null): void {
    this.search$.next(value ?? "");
  }

  onCategoryPhotoChange(photo: File): void {
    console.log("Change", photo)
  }

  onCategoryPhotoReject(photo: any): void {
    console.log("Reject", photo)
  }

  onCategoryPhotoRemoved(photo: any): void {
    console.log("Remove", photo)
  }

  onSave(): void {
    console.log(this.generalFormGroup)
  }

  onSaveAndContinue(): void {

  }
}
