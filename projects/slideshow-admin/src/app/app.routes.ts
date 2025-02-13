import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'slideshow-admin',
        loadComponent: () => import('./components/index').then(m => m.AdminHomeComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./components/index').then(m => m.AdminDashboardComponent)
            },
            {
                path: 'slides',
                loadComponent: () => import('./components/index').then(m => m.SlidesComponent)
            },
            {
                path: 'create-slide',
                loadComponent: () => import('./components/index').then(m => m.CreateSlideComponent)
            },
        ]
    },
];
