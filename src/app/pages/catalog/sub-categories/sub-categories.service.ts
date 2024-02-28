import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { z } from 'zod';

import { DefaultLinkModel, DefaultLinkModelSchema, SubCategoryModel } from '@core/models';
import { parseResponse } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  constructor(private readonly http: HttpClient) {}

  getSubCategories(search: string): Observable<SubCategoryModel[]> {
    return this.http.get<SubCategoryModel[]>('/api/subCategories/common', {
      params: { search },
    });
  }

  getDefaultLinks(search: string): Observable<DefaultLinkModel[]> {
    return this.http
      .get('/api/subCategories/links', {
        params: { search },
      })
      .pipe(parseResponse(z.array(DefaultLinkModelSchema)));
  }

  //   getSampleCategories()
}
