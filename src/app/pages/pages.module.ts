import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutModule } from '@components/layout/layout.module';

@NgModule({
  declarations: [],
  imports: [PagesRoutingModule, LayoutModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
