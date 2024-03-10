import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { TuiAlertService } from '@taiga-ui/core';
import { controlValue$ } from '@shared/utils';
import { TuiContextWithImplicit, TuiStringHandler, tuiIsFalsy } from '@taiga-ui/cdk';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';

import { ContactDetailType, COUNTRIES } from '@core/helpers';
import { ManufactureActionModel, ManufactureContactActionModel, ManufactureModel } from '@core/models';
import { ManufacturesService } from '@pages/catalog/manufactures';

const VALIDATORS_BY_TYPE: Record<ContactDetailType, ValidatorFn[]> = {
  [ContactDetailType.Phone]: [Validators.required, Validators.pattern(/^\+\d{8,14}$/)],
  [ContactDetailType.Email]: [Validators.required, Validators.email]
};

function createContactDetailFormGroup(contactDetail?: ManufactureContactActionModel)
: FormGroup<ManufactureContactActionModel> {
  const formGroup = new FormGroup<ManufactureContactActionModel>({
    contactInformation: new FormControl(contactDetail?.contactInformation ?? '', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    type: new FormControl(contactDetail?.type ?? ContactDetailType.Phone, { 
      nonNullable: true, 
      validators: [Validators.required, Validators.required] 
    }),
  });

  controlValue$(formGroup.controls.type).subscribe((type) => {
    formGroup.controls.contactInformation.setValidators(VALIDATORS_BY_TYPE[type]);
  });
  
  return formGroup;
}

@Component({
  selector: 'app-update-manufacture',
  templateUrl: 'update-manufacture.component.html',
  styleUrl: 'update-manufacture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateManufactureComponent implements OnInit {
  activeIndex = 0;

  photo: File | null = null;
  imageURL: string | ArrayBuffer | null = null;
  uploadProgress = 0;
  isImageLoading = false;

  readonly countriesCodes: ReadonlyArray<TuiCountryIsoCode> = [
    TuiCountryIsoCode.RU,
    TuiCountryIsoCode.TJ,
  ];

  readonly countries = COUNTRIES;

  readonly data$: Observable<ManufactureModel>;
  readonly loading$: Observable<boolean>;

  data!: ManufactureModel;

  manufactureGeneralForm!: FormGroup<ManufactureActionModel>;

  contactGroupFormArray!: FormArray<FormGroup<ManufactureContactActionModel>>;
  contactGroupForm!: FormGroup<ManufactureContactActionModel>;

  constructor(
    private readonly manufacturerService: ManufacturesService,
    private readonly alerts: TuiAlertService,
    private readonly router: ActivatedRoute,
    private readonly route: Router
  ) {
    const manufactureId = this.router.snapshot.paramMap.get('manufactureId');

    if (manufactureId === null) {
      this.route.navigate(['/catalog/manufactures']);
    }

    this.manufactureGeneralForm = new FormGroup<ManufactureActionModel>({
      displayOrder: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: false, validators: [Validators.maxLength(800)] }),
      country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      fullAddress: new FormControl('', { nonNullable: false, validators: [Validators.maxLength(100)] }),
      website: new FormControl(''),
      folder: new FormControl(''),
      photo: new FormControl([])
    });

    this.contactGroupForm = new FormGroup<ManufactureContactActionModel>({
      contactInformation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      type: new FormControl(ContactDetailType.Phone, { nonNullable: true, validators: [Validators.required, Validators.required] }),
    });

    this.data$ = this.manufacturerService.getManufactureById(manufactureId!);

    this.loading$ = this.data$.pipe(map(tuiIsFalsy));
  }

  ngOnInit(): void {
    this.data$.subscribe((result) => {
      this.manufactureGeneralForm.get('displayOrder')?.setValue(result.displayOrder);
      this.manufactureGeneralForm.get('name')?.setValue(result.name);
      this.manufactureGeneralForm.get('description')?.setValue(result.description);
      this.manufactureGeneralForm.get('country')?.setValue(result.country);
      this.manufactureGeneralForm.get('fullAddress')?.setValue(result.fullAddress);
      this.manufactureGeneralForm.get('website')?.setValue(result.website);
    });

    this.contactGroupFormArray 
      = new FormArray<FormGroup<ManufactureContactActionModel>>([]);
    this.contactGroupFormArray.push(this.contactGroupForm);
  }

  protected createContactDetails(): void {
    const formGroup = createContactDetailFormGroup();
    this.contactGroupFormArray.controls.push(formGroup);
  }

  protected get readOnly(): boolean {
    return false; // this.context.data.readOnly ??
  }

  protected onManufacturePhotoChange(photo: File): void {
    this.photo = photo;

    const reader = new FileReader();
    reader.onload = () => (this.imageURL = reader.result);
    reader.readAsDataURL(photo);
  }

  protected onManufacturePhotoRemoved(): void {
    this.photo = null;
  }

  protected onSaveManufacture(): void {
    if (!this.manufactureGeneralForm.valid) {
      return;
    }

    const formData = new FormData();

    if (this.manufactureGeneralForm.value.name) {
      formData.append('name', this.manufactureGeneralForm.value.name);
    }

    if (this.manufactureGeneralForm.value.description) {
      formData.append('description', this.manufactureGeneralForm.value.description);
    }

    if (this.manufactureGeneralForm.value.country) {
      formData.append('country', this.manufactureGeneralForm.value.country);
    }

    if (this.manufactureGeneralForm.value.displayOrder) {
      formData.append('displayOrder', this.manufactureGeneralForm.value.displayOrder.toString());
    }

    if (this.manufactureGeneralForm.value.website) {
      formData.append('website', this.manufactureGeneralForm.value.website);
    }

    if (this.manufactureGeneralForm.value.fullAddress) {
      formData.append('fullAddress', this.manufactureGeneralForm.value.fullAddress);
    }

    if (this.photo) {
      formData.append('photo', this.photo);
      formData.append('folder', 'manufactures');
    }

    this.manufacturerService
      .createManufacture(formData)
      .subscribe(() => { 
        this.alerts
          .open('Успешно обновлено!', { status: 'success' })
          .subscribe();

          this.route.navigate(['/catalog/manufactures']);
        }
      );
  }

  protected readonly stringifyType: TuiStringHandler<TuiContextWithImplicit<ContactDetailType>> = ({ $implicit }) => {
    return $implicit;
  };
}
