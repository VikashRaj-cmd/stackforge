/**
 * app.routes.ts
 *
 * WHY:
 * This file defines frontend page navigation.
 * For now, dashboard is the home page.
 * Later we will add auth, projects, issues, users, comments, and labels routes.
 */

import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Dashboard,
        title: 'Dashboard | Issue Tracker',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];