import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultLinkModel} from "@core/models/catalog/categories/link.model";
import {CategoryModel} from "@core/models/catalog/categories/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private readonly http: HttpClient
  ) { }

  protected getCategories(): void { // Observable<CategoryModel>

  }

  getDefaultLinks(search: any): Observable<DefaultLinkModel[]> {
    return this.http.get<DefaultLinkModel[]>(
      '/api/categories/links',
      {
        params: { search: search }
        }
      );
  }
}
