import { Injectable } from "@angular/core";

import { AbstractTuiDialogService } from "@taiga-ui/cdk";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";

import { PromptOptions } from "@core/models";
import { SelectCategoryDialogComponent } from "./select-category-dialog.component";

@Injectable({
  providedIn: 'root',
})
export class SelectCategoryDialogService 
  extends AbstractTuiDialogService<PromptOptions, boolean> {
  readonly defaultOptions = {
    heading: 'Are you sure?',
    buttons: ['Yes', 'No'],
    isValid: false,
    value: {}
  } as const;

  readonly component = new PolymorpheusComponent(SelectCategoryDialogComponent);
}