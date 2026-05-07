/**
 * authGuard.ts
 *
 * WHY:
 * This guard protects private frontend routes.
 * If user has JWT token, route opens.
 * If token is missing, user is redirected to login page.
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

/**
 * Protect route based on login status.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};