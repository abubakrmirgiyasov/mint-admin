import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { getJwtUser } from '@core/helpers';
import { SignInService } from '@pages/auth/sign-in/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router, private readonly signInService: SignInService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.signInService.isAuthenticated()) {
      const roles = route.data['permittedRoles'] as Array<string>;

      if (roles) {
        if (!this.roleMatch(roles)) {
          this.router.navigate(['/forbidden']);
          return false;
        }
        return true;
      }
      return true;
    } else {
      return this.router.createUrlTree(['/auth/sign-in'], {
        queryParams: { returnUrl: state.url },
      });
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.signInService.isAuthenticated()) {
      const roles = childRoute.data['permittedRoles'] as Array<string>;

      if (roles) {
        if (!this.roleMatch(roles)) {
          this.router.navigate(['/errors/forbidden-403']);
          return false;
        }
        return true;
      }
      return true;
    } else {
      return this.router.createUrlTree(['/auth/sign-in'], {
        queryParams: { returnUrl: state.url },
      });
    }
  }

  private roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const roles = getJwtUser().role.split(',');

    allowedRoles.forEach((allowedRole) => {
      roles.forEach((role) => {
        if (allowedRole === role) {
          isMatch = true;
        }

        return isMatch;
      });
    });

    return isMatch;
  }
}
