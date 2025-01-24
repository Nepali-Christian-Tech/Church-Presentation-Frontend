import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { debounceTime, distinctUntilChanged, map } from "rxjs";
import * as DataActions from '../actions/search.action';

@Injectable()
export class SearchEffect {

    searchText$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(DataActions.setSearchText),
            debounceTime(300),
            distinctUntilChanged(),
            map((action) => DataActions.setSearchTextSuccess({ text: action.text }))
        )
    )
}