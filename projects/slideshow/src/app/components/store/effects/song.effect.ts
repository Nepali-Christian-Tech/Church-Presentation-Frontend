import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SongBibleService } from '../../song-and-bible/services';
import * as DataActions from '../actions/song.action';

@Injectable()
export class SongEffect {

  private songBibleService = inject(SongBibleService);

  loadSongs$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(DataActions.loadSongs),
      mergeMap(() => this.songBibleService.getSongs().pipe(
        map(songs => DataActions.loadSongsSuccess({ songs })),
        catchError(error => of(DataActions.loadSongsFailure({ error })))
      )
      )
    )
  );

}