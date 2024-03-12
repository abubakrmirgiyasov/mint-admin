import { ChangeDetectionStrategy, Component, Inject, NgZone } from '@angular/core';

import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { ManufacturesService } from '@pages/catalog/manufactures';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { AnimationOptions } from 'ngx-lottie';

export interface DeleteManufactureComponentData {
  manufactureId: string;
}

@Component({
  selector: 'app-delete-manufacture',
  templateUrl: 'delete-manufacture.component.html',
  styleUrl: 'delete-manufacture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteManufactureComponent {
  readonly options: AnimationOptions = {
    path: '/assets/animations/delete.json',
    autoplay: false,
  };

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, DeleteManufactureComponentData>,
    private readonly manufacturesService: ManufacturesService,
    private readonly ngZone: NgZone,
    private readonly alerts: TuiAlertService
  ) {
    
  }

  protected onCancel(): void {
    this.context.$implicit.complete();
  }

  protected onDelete(): void {
    this.manufacturesService
      .deleteManufacture(this.context.data.manufactureId)
      .subscribe(() => {
        this.alerts
          .open('Успешно удалено!', { status: 'warning' })
          .subscribe();

        this.context.$implicit.complete();
      });
  }
}
