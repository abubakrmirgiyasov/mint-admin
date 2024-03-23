import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { TuiReorderModule, TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
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
  TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiInputFilesModule,
  TuiInputModule, TuiInputNumberModule,
  TuiInputPhoneInternationalModule,
  TuiIslandModule, TuiPaginationModule,
  TuiSelectModule,
  TuiTabsModule, TuiTextareaModule, TuiToggleModule
} from "@taiga-ui/kit";

import { SearchBarModule } from "@shared/kit";
import { HighlighterDirectiveModule, PermittedRoleDirectiveModule } from "@shared/cdk";
import { CatalogRoutingModule } from "@pages/catalog/catalog-routing.module";
import { NewCategoryComponent, UpdateCategoryComponent, DeleteCategoryComponent, CategoriesComponent } from "@pages/catalog/categories";
import { NewSubCategoryComponent, SubCategoriesComponent } from "@pages/catalog/sub-categories";
import { DeleteManufactureComponent, ManufacturesComponent, NewManufactureComponent, UpdateManufactureComponent } from "@pages/catalog/manufactures";
import { LottieComponent } from "ngx-lottie";

@NgModule({
  declarations: [
    CategoriesComponent,
    NewCategoryComponent,
    UpdateCategoryComponent,

    SubCategoriesComponent,
    NewSubCategoryComponent,
    
    ManufacturesComponent,
    NewManufactureComponent,
    UpdateManufactureComponent,
    DeleteManufactureComponent,
  ],
  imports: [
    CommonModule,

    // Lottie
    LottieComponent,

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
    TuiReorderModule,
    TuiFilterByInputPipeModule,
    // HighlighterDirectiveModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogModule { }
