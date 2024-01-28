import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CategoriesComponent} from "@pages/catalog/categories/categories.component";
import {CatalogRoutingModule} from "@pages/catalog/catalog.routing-module";
import {SearchBarModule} from "@shared/kit/search-bar/search-bar.module";
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiHintModule, TuiLabelModule,
    TuiLoaderModule, TuiScrollbarModule,
    TuiTextfieldControllerModule, TuiTooltipModule
} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";
import {NewCategoryComponent} from "@pages/catalog/categories/new-category/new-category.component";
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule, TuiInputFilesModule,
  TuiInputModule, TuiInputNumberModule,
  TuiIslandModule,
  TuiTabsModule, TuiTextareaModule, TuiToggleModule
} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiTableModule} from '@taiga-ui/addon-table';

@NgModule({
  declarations: [
    CategoriesComponent,
    NewCategoryComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogModule { }
