import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {getAccessToken, removeAccessToken, unauthorizedResult} from "@core/helpers/jwt-decode.helper";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly _returnUrl: string | null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this._returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getAccessToken();

    if (token) {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(cloneReq).pipe(
        tap(success => { },
          error => {
            switch (error.status) {
              case 401:
                removeAccessToken();
                unauthorizedResult();
                break;
              case 403:
                this.router.navigateByUrl('/forbidden');
                break;
              default:
                break;
            }
          })
      );
    } else {
      return next.handle(req.clone());
    }
  }
}
