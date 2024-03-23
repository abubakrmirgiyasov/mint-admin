import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Roles } from '@core/helpers/constants';
import { AuthGuard } from '@core/guards';
import { CategoriesComponent, NewCategoryComponent, UpdateCategoryComponent } from '@pages/catalog/categories';
import { SubCategoriesComponent, NewSubCategoryComponent } from '@pages/catalog/sub-categories';
import { ManufacturesComponent, NewManufactureComponent, UpdateManufactureComponent } from '@pages/catalog/manufactures';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
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
        path: 'categories/update/:categoryId',
        component: UpdateCategoryComponent,
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
      },
      {
        path: 'manufactures',
        component: ManufacturesComponent,
      },
      {
        path: 'manufactures/new',
        component: NewManufactureComponent,
        data: { permittedRoles: [Roles.admin] },
      },
      {
        path: 'manufactures/update/:manufactureId',
        component: UpdateManufactureComponent,
        data: { permittedRoles: [Roles.admin] },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
