/**
 * app.config.ts
 *
 * WHY:
 * Global Angular configuration.
 * HttpClient is required for backend API calls.
 * Animations are required for Angular Material components.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
  ],
};