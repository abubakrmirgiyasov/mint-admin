import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SignInService} from "@pages/auth/sign-in/sign-in.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(SignInService);

  if (authService.isAuthenticated())
    return true;
  else
    return router.createUrlTree(['/auth/sign-in'], {
      queryParams: { returnUrl: state.url },
    });
}

