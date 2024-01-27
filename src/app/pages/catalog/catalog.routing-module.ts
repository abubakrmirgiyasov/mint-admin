import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoriesComponent} from "@pages/catalog/categories/categories.component";
import {NewCategoryComponent} from "@pages/catalog/categories/new-category/new-category.component";

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/new',
    component: NewCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
