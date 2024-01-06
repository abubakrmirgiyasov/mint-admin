import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "@core/guards/auth.guard";
import {LayoutComponent} from "@components/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
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
