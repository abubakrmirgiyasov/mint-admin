import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from "@taiga-ui/cdk";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHintModule, TuiLabelModule,
  TuiLoaderModule, TuiScrollbarModule,
  TuiTextfieldControllerModule, TuiTooltipModule
} from "@taiga-ui/core";
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule, TuiInputFilesModule,
  TuiInputModule, TuiInputNumberModule,
  TuiIslandModule, TuiPaginationModule,
  TuiTabsModule, TuiTextareaModule, TuiToggleModule
} from "@taiga-ui/kit";

import { CategoriesComponent } from "@pages/catalog/categories";
import { SearchBarModule } from "@shared/kit";
import { HighlighterDirectiveModule, PermittedRoleDirectiveModule } from "@shared/cdk";

import { CatalogRoutingModule } from "@pages/catalog/catalog-routing.module";
import { NewCategoryComponent } from "@pages/catalog/categories";

@NgModule({
  declarations: [
    CategoriesComponent,
    NewCategoryComponent,
  ],
  imports: [
    CommonModule,

    CatalogRoutingModule,
    SearchBarModule,
    TuiButtonModule,
    TuiHintModule,
    TuiTabsModule,
    TuiLetModule,
    TuiInputModule,
    TuiIslandModule,
    TuiInputNumberModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiLoaderModule,
    TuiToggleModule,
    TuiTooltipModule,
    TuiLabelModule,
    TuiTextareaModule,
    TuiInputFilesModule,
    TuiScrollbarModule,
    TuiTableModule,
    TuiPaginationModule,
    PermittedRoleDirectiveModule,
    TuiDropdownModule,
    // HighlighterDirectiveModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogModule { }
