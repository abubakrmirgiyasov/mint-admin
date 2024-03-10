import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from "@taiga-ui/cdk";
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHintModule, TuiHostedDropdownModule, TuiLabelModule,
  TuiLoaderModule, TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule, TuiTooltipModule
} from "@taiga-ui/core";
import {
  TuiAvatarModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule, TuiInputFilesModule,
  TuiInputModule, TuiInputNumberModule,
  TuiInputPhoneInternationalModule,
  TuiIslandModule, TuiPaginationModule,
  TuiSelectModule,
  TuiTabsModule, TuiTextareaModule, TuiToggleModule
} from "@taiga-ui/kit";

import { SearchBarModule } from "@shared/kit";
import { HighlighterDirectiveModule, PermittedRoleDirectiveModule } from "@shared/cdk";
import { CatalogRoutingModule } from "@pages/catalog/catalog-routing.module";
import { NewCategoryComponent, CategoriesComponent } from "@pages/catalog/categories";
import { NewSubCategoryComponent, SubCategoriesComponent } from "@pages/catalog/sub-categories";
import { ManufacturesComponent, NewManufactureComponent, UpdateManufactureComponent } from "@pages/catalog/manufactures";

@NgModule({
  declarations: [
    CategoriesComponent,
    NewCategoryComponent,
    SubCategoriesComponent,
    NewSubCategoryComponent,
    ManufacturesComponent,
    NewManufactureComponent,
    UpdateManufactureComponent,
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
    TuiSelectModule,
    TuiInputPhoneInternationalModule,
    TuiTablePaginationModule,
    TuiAvatarModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    // HighlighterDirectiveModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogModule { }
