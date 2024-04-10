import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/homepage/homepage.component'),
  },
  {
    path: 'cities',
    loadComponent: () => import('./views/city-list/city-list.component'),
  },
  {
    path: 'forms/:id',
    loadComponent: () => import('./views/forms/forms.component'),
  },
  {
    path: 'form-create',
    loadComponent: () => import('./views/form-create/form-create.component'),
  },
];
