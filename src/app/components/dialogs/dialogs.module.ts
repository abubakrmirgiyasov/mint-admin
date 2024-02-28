import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiTooltipModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

import { SelectCategoryDialogComponent } from '@components/dialogs';
import { DIALOGS_PROVIDERS } from './dialogs.providers';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    TuiButtonModule,
    TuiComboBoxModule, 
    TuiDataListModule,
    TuiTooltipModule,
    TuiDataListWrapperModule,
    PolymorpheusModule, 
    CommonModule,
    RouterModule,
  ],
  declarations: [SelectCategoryDialogComponent],
  providers: DIALOGS_PROVIDERS,
  exports: [SelectCategoryDialogComponent],
})
export class DialogsModule {}
