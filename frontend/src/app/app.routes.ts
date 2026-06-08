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
import { IssueList } from './features/issues/issue-list/issue-list';
import { IssueForm } from './features/issues/issue-form/issue-form';
import { IssueDetails } from './features/issues/issue-details/issue-details';
import { IssueBoard } from './features/issues/issue-board/issue-board';

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
        component: IssueList,
        title: 'Issues | Issue Tracker',
      },
      {
        path: 'issues/create',
        component: IssueForm,
        title: 'Create Issue | Issue Tracker',
      },
      {
        path: 'issues/edit/:id',
        component: IssueForm,
        title: 'Edit Issue | Issue Tracker',
      },
      {
        path: 'issues/board',
        component: IssueBoard,
        title: 'Issue Board | Issue Tracker',
      },
      {
        path: 'issues/:id',
        component: IssueDetails,
        title: 'Issue Details | Issue Tracker',
      },
      {
        path: 'labels',
        loadComponent: () => import('./features/labels/label-list/label-list').then((m) => m.LabelList),
        title: 'Labels | StackForge',
      },
      {
        path: 'labels/create',
        loadComponent: () => import('./features/labels/label-form/label-form').then((m) => m.LabelForm),
        title: 'Create Label | StackForge',
      },
      {
        path: 'labels/edit/:id',
        loadComponent: () => import('./features/labels/label-form/label-form').then((m) => m.LabelForm),
        title: 'Edit Label | StackForge',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
