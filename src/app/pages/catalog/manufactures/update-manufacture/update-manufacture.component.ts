import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { TuiAlertService } from '@taiga-ui/core';
import { TuiContextWithImplicit, TuiStringHandler, tuiIsFalsy } from '@taiga-ui/cdk';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';

import { ContactDetailType, COUNTRIES } from '@core/helpers';
import { ManufactureActionModel, ManufactureContactActionModel, ManufactureModel } from '@core/models';
import { ManufacturesService } from '@pages/catalog/manufactures';

@Component({
  selector: 'app-update-manufacture',
  templateUrl: 'update-manufacture.component.html',
  styleUrl: 'update-manufacture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateManufactureComponent {
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

  readonly manufactureId: string | null;

  readonly countries = COUNTRIES;

  readonly data$: Observable<ManufactureModel>;
  
  data!: ManufactureModel;
  loading: boolean = true;

  manufactureGeneralForm!: FormGroup<ManufactureActionModel>;

  contactGroupFormArray!: FormArray<FormGroup<ManufactureContactActionModel>>;
  contactGroupForm!: FormGroup<ManufactureContactActionModel>;

  constructor(
    private readonly manufacturesService: ManufacturesService,
    private readonly alerts: TuiAlertService,
    private readonly router: ActivatedRoute,
    private readonly route: Router
  ) {
    this.manufactureId = this.router.snapshot.paramMap.get('manufactureId');

    if (this.manufactureId === null) {
      this.route.navigate(['/catalog/manufactures']);
    }
    
    this.data$ = this.manufacturesService.getManufactureById(this.manufactureId!);

    this.data$.subscribe(() => {
      this.loading = false;
    });

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
    switch(this.activeIndex) {
      case 0: 
        if (!this.manufactureGeneralForm.valid) {
          this.alerts
            .open('Заполните поля корректно!', { status: 'error' })
            .subscribe();

          return;
        }

        const formData = this.saveManufacture();

        this.manufacturesService
          .updateManufacture(this.manufactureId!, formData)
          .subscribe(() => { 
            this.alerts
              .open('Успешно обновлено!', { status: 'success' })
              .subscribe();
    
              this.route.navigate(['/catalog/manufactures']);
            }
          );
        break;
      case 1:
        if (!this.contactGroupForm.valid) {
          this.alerts
            .open('Заполните поля корректно!', { status: 'error' })
            .subscribe();

          return;
        }

        this.saveManufactureContacts();
        break;
      default:
        
        break;
    }
  }

  protected onSaveManufactureAndContinue(): void {

  }

  private saveManufactureContacts(): void {
console.log(this.contactGroupFormArray.value);
    const formData = new FormData();

    for (let i = 0; i < this.contactGroupFormArray.value.length; i++) {
      const item = this.contactGroupFormArray.value[i];
  
      formData.append(`contacts[${i}].type`, item.type ?? "");
      formData.append(`contacts[${i}].contactInformation`, item.contactInformation ?? "");
    }
    
    this.manufacturesService
      .updateManufactureContact(this.manufactureId!, formData)
      .subscribe(() => { 
        this.alerts
          .open('Успешно обновлено!', { status: 'success' })
          .subscribe();

          this.route.navigate(['/catalog/manufactures']);
        }
      );
  }

  private saveManufacture(): FormData {
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

    return formData;
  }

  protected readonly stringifyType
    : TuiStringHandler<TuiContextWithImplicit<ContactDetailType>> = ({ $implicit }) => {
    return $implicit;
  };

  protected readonly stringifyCountry = (country: string): string => {
    return country;
  }
}
