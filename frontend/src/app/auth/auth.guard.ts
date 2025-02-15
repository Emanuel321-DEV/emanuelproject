import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const requiresAdmin = route.data?.['requiresAdmin'] || false;
  debugger;
  if (requiresAdmin && !authService.isAdmin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
