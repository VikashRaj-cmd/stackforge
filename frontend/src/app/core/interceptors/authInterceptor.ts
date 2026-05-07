/**
 * authInterceptor.ts
 *
 * WHY:
 * This interceptor automatically attaches JWT token to API requests.
 * Backend protected routes need:
 * Authorization: Bearer <token>
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth';

/**
 * Add Bearer token to every outgoing request when token exists.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};