import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Forbidden403Component } from "./forbidden403";

const routes: Routes = [
    {
        path: 'forbidden-403',
        component: Forbidden403Component
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorsRoutingModule { }