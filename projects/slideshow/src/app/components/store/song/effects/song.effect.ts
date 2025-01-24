import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { SongBibleService } from '../../../song-and-bible/services';
import * as LoaderActions from '../../loader';
import * as DataActions from '../actions/song.action';
import { SongState } from '../reducers/song.reducer';

@Injectable()
export class SongEffect {

  private songBibleService = inject(SongBibleService);
  private store = inject(Store<SongState>);

  loadSongs$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(DataActions.loadSongs),
      tap(() => this.store.dispatch(LoaderActions.startLoading())),
      mergeMap(() => this.songBibleService.getSongs().pipe(
        map(songs => DataActions.loadSongsSuccess({ songs })),
        catchError(error => of(DataActions.loadSongsFailure({ error }))),
        finalize(() => this.store.dispatch(LoaderActions.stopLoading()))
      )),
    )
  );


}