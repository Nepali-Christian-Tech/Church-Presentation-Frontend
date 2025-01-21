import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/index').then(m => m.HomeComponent)
    },
    {
        path: 'bible-bhajan',
        loadComponent: () => import('../app/components/song-and-bible').then(m => m.SongBibleComponent),
        children: [
            {
                path: '',
                redirectTo: 'bhajan',
                pathMatch: 'full'
            },
            {
                path: 'bhajan',
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
