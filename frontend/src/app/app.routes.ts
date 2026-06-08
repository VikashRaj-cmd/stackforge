/**
 * app.routes.ts
 *
 * WHY:
 * Defines all frontend application routes.
 * Protected routes use authGuard.
 * All feature components use loadComponent (lazy) so their
 * ngOnInit and API calls only fire when the route is visited.
 */

import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/authGuard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Login | StackForge',
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
    title: 'Register | StackForge',
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
        title: 'Dashboard | StackForge',
      },

      /**
       * Project Routes
       */
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/project-list/project-list').then((m) => m.ProjectList),
        title: 'Projects | StackForge',
      },
      {
        path: 'projects/create',
        loadComponent: () => import('./features/projects/project-form/project-form').then((m) => m.ProjectForm),
        title: 'Create Project | StackForge',
      },
      {
        path: 'projects/edit/:id',
        loadComponent: () => import('./features/projects/project-form/project-form').then((m) => m.ProjectForm),
        title: 'Edit Project | StackForge',
      },
      {
        path: 'projects/:id',
        loadComponent: () => import('./features/projects/project-details/project-details').then((m) => m.ProjectDetails),
        title: 'Project Details | StackForge',
      },

      /**
       * Issue Routes
       */
      {
        path: 'issues',
        loadComponent: () => import('./features/issues/issue-list/issue-list').then((m) => m.IssueList),
        title: 'Issues | StackForge',
      },
      {
        path: 'issues/create',
        loadComponent: () => import('./features/issues/issue-form/issue-form').then((m) => m.IssueForm),
        title: 'Create Issue | StackForge',
      },
      {
        path: 'issues/:id',
        loadComponent: () => import('./features/issues/issue-detail/issue-detail').then((m) => m.IssueDetail),
        title: 'Issue Detail | StackForge',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
