/**
 * app.routes.ts
 *
 * WHY:
 * Defines frontend page navigation.
 * Auth pages are separate from dashboard layout.
 */

import { Routes } from '@angular/router';

import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login | Issue Tracker',
  },
  {
    path: 'register',
    component: Register,
    title: 'Register | Issue Tracker',
  },
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