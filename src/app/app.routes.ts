import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'forms',
    loadComponent: () => import('./forms/forms'),
    title: 'Signal forms',
  },
];
