import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {authGuard} from "@core/guards/auth.guard";
import {LayoutComponent} from "@components/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/pages.module')
      .then((i) => i.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/identity.module')
      .then((i) => i.IdentityModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
