import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { removeAccessToken } from '@core/helpers';
import { ErrorDialogDataModel, ProblemDetails } from '@core/models';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private ngZone: NgZone) {}

  async handleError(error: Error | HttpErrorResponse): Promise<void> {
    if (error instanceof HttpErrorResponse) {

      // Server error
      switch (error.status) {
        case 0:
        case 504: {
          this.showErrorDialog(
            'Не удалось отправить запрос на сервер.\nПроверьте подключение к интернету или попробуйте позднее.',
            error.message
          );
          break;
        }
        case 401: {
          const router = this.injector.get(Router);

          this.ngZone.run(() => {
            removeAccessToken();
            router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: router.url } });
          });
          break;
        }
        case 403: {
          this.showErrorNotification('Доступ запрещен!');
          break;
        }
        default: {
          let errorMessage = '';
          let details: string | object | undefined;

          if (error.status >= 400 && error.status < 600) {
            if (error.error == null) {
              errorMessage = `Статус код: ${error.status}\n ${error.message}`;
            } else if (typeof error.error == 'string') {
              errorMessage = error.error;
            } else {
              let err = error.error;

              if (err instanceof Blob) {
                err = await err.arrayBuffer();
              }

              let problemDetails: ProblemDetails | null | undefined;

              if (err instanceof ArrayBuffer) {
                const decoder = new TextDecoder();
                problemDetails = JSON.parse(decoder.decode(err)) as ProblemDetails;
              } else {
                problemDetails = err;
              }

              if (problemDetails?.title != null || problemDetails?.detail != null) {
                errorMessage = [problemDetails.title, problemDetails.detail].filter((x) => x != null).join('\n');
              } else {
                errorMessage = 'Неизвестная ошибка. См. подробности.';
              }

              details = problemDetails ?? undefined;
            }
          } else {
            errorMessage = `Неизвестная ошибка:\n${error.message}`;
          }
          
          this.showErrorDialog(errorMessage, details);
        }
      }
    } else {
      // Client error
      this.showErrorDialog(error.message, error.stack);
    }

    console.error(error);
  }

  private showErrorDialog(message: string, details?: string | object): void {
    const dialogs = this.injector.get(TuiDialogService);

    this.ngZone.run(() => {
      dialogs
        .open(new PolymorpheusComponent(ErrorDialogComponent, this.injector), {
          label: 'Произошла ошибка',
          size: 'auto',
          data: { message, details } as ErrorDialogDataModel,
        })
        .subscribe();
    });
  }

  private showErrorNotification(message: string): void {
    const alerts = this.injector.get(TuiAlertService);
    this.ngZone.run(() => {
      alerts.open(message, { status: 'error' });
    });
  }
}
