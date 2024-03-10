import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { ErrorsRoutingModule, Forbidden403Component } from '@pages/errors'

@NgModule({
    declarations: [Forbidden403Component],
    imports: [ErrorsRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorsModule { }