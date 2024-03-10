import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ManufactureModel, PaginatedResultModel } from '@core/models';

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
}
