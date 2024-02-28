import { Provider } from '@angular/core';
import { TUI_DIALOGS } from '@taiga-ui/cdk';
import { SelectCategoryDialogService } from './select-category-dialog/select-category-dialog.service';

export const DIALOGS_PROVIDERS: Provider[] = [
  {
    provide: TUI_DIALOGS,
    useExisting: SelectCategoryDialogService,
    multi: true,
  },
];
