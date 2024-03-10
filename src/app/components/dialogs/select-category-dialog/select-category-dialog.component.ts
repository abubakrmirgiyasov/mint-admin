import { ChangeDetectionStrategy, Component, Inject, Self } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';

import { TuiDialogCloseService } from '@taiga-ui/core';
import { TuiDestroyService, TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { PromptOptions } from '@core/models';

@Component({
  selector: 'app-select-category-dialog',
  templateUrl: './select-category-dialog.component.html',
  styleUrl: './select-category-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDialogCloseService, TuiDestroyService]
})
export class SelectCategoryDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<PromptOptions, boolean>,
    @Inject(TuiDialogCloseService) close$: Observable<unknown>,
    @Self() @Inject(TuiDestroyService) destroy$: Observable<unknown>
  ) {
    close$
      .pipe(takeUntil(destroy$))
      .subscribe(() => this.context.$implicit.complete());

      (this.context.value as FormControl).valueChanges.subscribe();
  }

  onClick(response: boolean): void {
    this.context.completeWith(response);
  }
}
