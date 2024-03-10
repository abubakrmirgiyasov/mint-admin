import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { z } from 'zod';

import { DefaultLinkModel, DefaultLinkModelSchema, PaginatedResultModel, SubCategoriesActionModel, SubCategoryModel, SubCategoryModelSchema } from '@core/models';
import { parseResponse } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  constructor(private readonly http: HttpClient) {}

  getSubCategories(search: string, pageIndex: number, pageSize: number): Observable<PaginatedResultModel<SubCategoryModel>> {
    return this.http.get<PaginatedResultModel<SubCategoryModel>>('/api/subCategories', {
      params: { 
        search,
        pageIndex,
        pageSize, 
      },
    });
  }

  getDefaultLinks(search: string): Observable<DefaultLinkModel[]> {
    return this.http
      .get('/api/subCategories/links', {
        params: { search },
      })
      .pipe(parseResponse(z.array(DefaultLinkModelSchema)));
  }

  createSubCategory<T>(subCategory: T): Observable<SubCategoryModel> {
    return this.http
      .post('/api/subCategories', subCategory)
      .pipe(parseResponse(SubCategoryModelSchema));
  }
}
