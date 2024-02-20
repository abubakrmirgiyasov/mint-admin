import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { CategoryModel, DefaultLinkModel, PaginatedResultModel } from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private readonly http: HttpClient
  ) { }

  getCategories(search: string, pageIndex: number, pageSize: number)
    : Observable<PaginatedResultModel<CategoryModel>> {
    return this.http.get<PaginatedResultModel<CategoryModel>>('/api/categories', {
      params: {
        search, pageIndex, pageSize
      }
    });
  }

  getDefaultLinks(search: any): Observable<DefaultLinkModel[]> {
    return this.http.get<DefaultLinkModel[]>(
      '/api/categories/links',
      {
        params: { search: search }
        }
      );
  }

  createNewCategory(value: any): Observable<any> {
    return this.http.post('/api/categories/create', value);
  }
}
