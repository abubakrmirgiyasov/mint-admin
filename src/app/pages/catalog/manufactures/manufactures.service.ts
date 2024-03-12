import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ManufactureContactActionModel, ManufactureContactModel, ManufactureModel, PaginatedResultModel } from '@core/models';
import { VALIDATORS_BY_TYPE, ContactDetailType } from '@core/helpers';
import { controlValue$ } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ManufacturesService {
  constructor(
    private readonly http: HttpClient
  ) { }

  getManufactures(
    search: string,
    pageIndex: number,
    pageSize: number
  ): Observable<PaginatedResultModel<ManufactureModel>> {
    return this.http.get<PaginatedResultModel<ManufactureModel>>('/api/manufactures', {
      params: {
        search,
        pageIndex,
        pageSize,
      },
    });
  }

  getManufactureById(id: string): Observable<ManufactureModel> {
    return this.http.get<ManufactureModel>(`/api/manufactures/${id}`);
  }

  createManufacture(manufacture: FormData): Observable<string> {
    return this.http.post<string>('/api/manufactures', manufacture);
  }

  updateManufacture(manufactureId: string, manufacture: FormData): Observable<void> {
    return this.http.put<void>(`/api/manufactures/${manufactureId}`, manufacture);
  }

  updateManufactureContact(manufactureId: string, contacts: FormData): Observable<void> {
    return this.http.put<void>(`/api/manufactures/${manufactureId}/contacts`, contacts);
  }

  deleteManufacture(manufactureId: string): Observable<void> {
    return this.http.delete<void>(`/api/manufactures/${manufactureId}`);
  }
  
  createContactDetailFormGroup(contactDetail?: ManufactureContactActionModel)
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
}
