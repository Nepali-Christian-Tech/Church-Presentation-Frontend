import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { SongBibleService } from "../../song-and-bible/services";
import * as DataActions from '../actions/bible.action';

@Injectable()
export class BibleEffect {

    private songBibleService = inject(SongBibleService)

    loadBibleInformation = createEffect(() =>
        inject(Actions).pipe(
            ofType(DataActions.loadBibleInfo),
            mergeMap(() => this.songBibleService.getBibleInfo().pipe(
                map(bibleInfo => DataActions.loadBibleInfoSuccess({ bibleInfo })),
                catchError(error => of(DataActions.loadBibleInfoFailure({ error })))
            ))
        )
    )
}