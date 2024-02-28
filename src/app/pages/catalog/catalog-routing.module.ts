import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Roles } from '@core/helpers/constants/roles.constants';

import { CategoriesComponent } from '@pages/catalog/categories';
import { NewCategoryComponent } from '@pages/catalog/categories';
import { NewSubCategoryComponent, SubCategoriesComponent } from '@pages/catalog/sub-categories';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'categories/new',
    component: NewCategoryComponent,
    data: { permittedRoles: [Roles.admin] },
  },
  {
    path: 'sub-categories',
    component: SubCategoriesComponent,
  },
  {
    path: 'sub-categories/:categoryId/new',
    component: NewSubCategoryComponent,
    data: { permittedRoles: [Roles.admin] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
