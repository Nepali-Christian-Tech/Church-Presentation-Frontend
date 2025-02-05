import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'slideshow-admin',
        loadComponent: () => import('./components/index').then(m => m.DashboardComponent)
    },
];
