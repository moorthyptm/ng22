import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'forms',
    loadComponent: () => import('./forms/forms'),
    title: 'Signal forms',
  },
  {
    path: 'resource',
    loadComponent: () => import('./resource/resource'),
    title: 'Signal resource | async',
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service-route')
  }
];
