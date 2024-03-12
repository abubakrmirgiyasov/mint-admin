import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { TuiContextWithImplicit, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TuiAlertService } from '@taiga-ui/core';

import { ManufactureActionModel, ManufactureContactActionModel } from '@core/models';
import { COUNTRIES, ContactDetailType } from '@core/helpers';
import { ManufacturesService } from '@pages/catalog/manufactures';

@Component({
  selector: 'app-new-manufacture',
  templateUrl: 'new-manufacture.component.html',
  styleUrl: 'new-manufacture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewManufactureComponent {
  activeIndex = 0;
  countrySearchValue = null;

  photo: File | null = null;
  imageURL: string | ArrayBuffer | null = null;
  uploadProgress = 0;
  isImageLoading = false;

  readonly countriesCodes: ReadonlyArray<TuiCountryIsoCode> = [
    TuiCountryIsoCode.RU,
    TuiCountryIsoCode.TJ,
  ];

  readonly countries = COUNTRIES;

  readonly manufactureGeneralForm: FormGroup<ManufactureActionModel>;

  readonly contactGroupFormArray: FormArray<FormGroup<ManufactureContactActionModel>>;
  readonly contactGroupForm: FormGroup<ManufactureContactActionModel>;

  constructor(
    private readonly manufacturesService: ManufacturesService,
    private readonly alerts: TuiAlertService,
    private readonly router: Router
  ) {
    this.manufactureGeneralForm = new FormGroup<ManufactureActionModel>({
      displayOrder: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: false, validators: [Validators.maxLength(800)] }),
      country: new FormControl(null, { nonNullable: true, validators: [Validators.required] }),
      fullAddress: new FormControl('', { nonNullable: false, validators: [Validators.maxLength(100)] }),
      website: new FormControl(''),
      folder: new FormControl(''),
      photo: new FormControl([])
    });

    this.contactGroupForm = new FormGroup<ManufactureContactActionModel>({
      contactInformation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      type: new FormControl(ContactDetailType.Phone, { nonNullable: true, validators: [Validators.required, Validators.required] }),
    });

    this.contactGroupFormArray 
      = new FormArray<FormGroup<ManufactureContactActionModel>>([]);
    this.contactGroupFormArray.push(this.contactGroupForm);
  }

  protected createContactDetails(): void {
    const formGroup = this.manufacturesService.createContactDetailFormGroup();
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

    this.manufacturesService
      .createManufacture(formData)
      .subscribe((res) => { 
        this.alerts
          .open('Успешно создано!', { status: 'success' })
          .subscribe();

          this.router.navigate(['/catalog/manufactures']);
        }
      );
  }

  protected readonly stringifyType
    : TuiStringHandler<TuiContextWithImplicit<ContactDetailType>> = ({ $implicit }) => {
    return $implicit;
  };

  protected readonly stringifyCountry = (country: string): string => {
    return country;
  }
}
