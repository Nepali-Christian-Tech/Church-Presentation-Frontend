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
            },
        ]
    },
    {
        path: 'bhajan-slide-show',
        loadComponent: () => import('./components/song-and-bible').then(m => m.ShowContentComponent)
    },
    {
        path: 'presentation',
        loadComponent: () => import('./components/index').then(m => m.PresentationComponent)
    },
    {
        path: 'control-slide-show',
        loadComponent: () => import('./components/').then(m => m.ControlSlideShowComponent)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
