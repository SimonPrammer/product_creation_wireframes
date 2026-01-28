import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'v1',
    loadComponent: () =>
      import('./explorations/v1-standard/v1.component').then((m) => m.V1Component)
  },
  { path: '', redirectTo: 'v1', pathMatch: 'full' }
];
