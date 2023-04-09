import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'checkbox-filter-list',
    title: 'Reactive Checkbox Filter List',
    loadComponent:
      () => import('./checkbox-filter-list/checkbox-filter-list.component')
        .then(m => m.CheckboxFilterListComponent)
  },
  {
    path: 'infinity-scroll-list',
    title: 'Reactive Infinity Scroll List',
    loadComponent:
      () => import('./infinity-scroll-list/infinity-scroll-list.component')
        .then(m => m.InfinityScrollListComponent)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'checkbox-filter-list',
  },
];
