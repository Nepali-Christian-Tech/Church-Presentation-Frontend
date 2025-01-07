import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/index').then(m => m.HomeComponent),
        children: [
            {
                path: '',
                redirectTo: 'songs',
                pathMatch: 'full'
            },
            {
                path: 'songs',
                loadComponent: () => import('./components/index').then(m => m.SongsComponent)
            },
            {
                path: 'bible',
                loadComponent: () => import('./components/index').then(m => m.BibleComponent)
            }
        ]
    },
    {
        path: 'presentation',
        loadComponent: () => import('./components/index').then(m => m.PresentationComponent)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
