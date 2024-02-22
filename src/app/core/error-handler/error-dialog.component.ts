import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { ErrorDialogDataModel } from '@core/models';

@Component({
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  protected showDetails = false;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<void, ErrorDialogDataModel>
  ) {}

  protected get detailAsString(): string | undefined {
    const details = this.context.data.details;

    if (details == null) {
      return undefined;
    }

    return typeof details === 'object' ? JSON.stringify(details, null, 2) : details;
  }
}
