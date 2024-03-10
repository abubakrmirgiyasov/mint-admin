import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { z } from 'zod';

import { CategoryModel, CategorySampleModel, CategorySampleModelSchema, DefaultLinkModel, DefaultLinkModelSchema, PaginatedResultModel } from '@core/models';
import { parseResponse } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly http: HttpClient) {}

  getCategories(search: string, pageIndex: number, pageSize: number): Observable<PaginatedResultModel<CategoryModel>> {
    return this.http.get<PaginatedResultModel<CategoryModel>>('/api/categories', {
      params: {
        search,
        pageIndex,
        pageSize,
      },
    });
  }

  getDefaultLinks(search: any): Observable<DefaultLinkModel[]> {
    return this.http.get('/api/categories/links', {
      params: { search: search },
    }).pipe(parseResponse(z.array(DefaultLinkModelSchema)));
  }

  getCommonCategories(search: string): Observable<CategorySampleModel[]> {
    return this.http.get('/api/categories/common', {
      params: { search },
    }).pipe(parseResponse(z.array(CategorySampleModelSchema)));
  }

  getCommonCategoryById(categoryId: string): Observable<CategorySampleModel[]> {
    return this.http.get(
      `/api/categories/${categoryId}/common`
    ).pipe(parseResponse(z.array(CategorySampleModelSchema)));
  }

  createNewCategory(value: FormData): Observable<string> {
    return this.http.post<string>('/api/categories', value);
  }
}
