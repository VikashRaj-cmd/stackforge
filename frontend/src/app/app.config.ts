/**
 * app.config.ts
 *
 * WHY:
 * This file contains global Angular application configuration.
 * We enable routing and HttpClient here so services can call backend APIs.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    /**
     * HttpClient is required to call backend APIs.
     * withFetch() improves modern browser/SSR compatibility.
     */
    provideHttpClient(withFetch()),
  ],
};