/**
 * app.config.ts
 *
 * WHY:
 * This file contains global Angular app configuration.
 * It enables routing and HttpClient.
 * It also registers JWT interceptor globally.
 */

import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),

    /**
     * HttpClient is required for backend API calls.
     * withInterceptors registers JWT interceptor.
     */
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
  ],
};