import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/index').then(m => m.HomeComponent)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
