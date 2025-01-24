import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, finalize, map, mergeMap, of, tap } from "rxjs";
import { SongBibleService } from "../../../song-and-bible/services";
import * as LoaderActions from '../../loader';
import * as DataActions from '../actions/bible.action';

@Injectable()
export class BibleEffect {

    private songBibleService = inject(SongBibleService);
    private store = inject(Store);

    loadBibleInformation = createEffect(() =>
        inject(Actions).pipe(
            ofType(DataActions.loadBibleInfo),
            tap(() => this.store.dispatch(LoaderActions.startLoading())),
            mergeMap(() => this.songBibleService.getBibleInfo().pipe(
                map(bibleInfo => DataActions.loadBibleInfoSuccess({ bibleInfo })),
                catchError(error => of(DataActions.loadBibleInfoFailure({ error }))),
                finalize(() => this.store.dispatch(LoaderActions.stopLoading()))
            )),
        )
    )
}