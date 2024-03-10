import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiButtonModule, TuiHintModule, TuiModeModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from '@shared/kit/search-bar/search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule,
    TuiModeModule,
    TuiHintModule,
  ],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
