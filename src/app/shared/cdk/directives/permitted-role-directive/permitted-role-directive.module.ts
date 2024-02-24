import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PermittedRoleDirective } from "./permitted-role.directive";

@NgModule({
    declarations: [PermittedRoleDirective],
    imports: [CommonModule],
    exports: [PermittedRoleDirective]
})
export class PermittedRoleDirectiveModule { }