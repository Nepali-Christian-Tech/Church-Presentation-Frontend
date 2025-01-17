import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./components/index').then(m => m.HomeComponent)
    },
    {
        path: 'bible-bhajan',
        loadComponent: () => import('../app/components/song-and-bible').then(m => m.HomeComponent),
        children: [
            {
                path: '',
                redirectTo: 'songs',
                pathMatch: 'full'
            },
            {
                path: 'songs',
                loadComponent: () => import('../app/components/song-and-bible').then(m => m.SongsComponent)
            },
            {
                path: 'bible',
                loadComponent: () => import('../app/components/song-and-bible').then(m => m.BibleComponent)
            }
        ]
    },
    {
        path: 'presentation',
        loadComponent: () => import('./components/index').then(m => m.PresentationComponent)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
