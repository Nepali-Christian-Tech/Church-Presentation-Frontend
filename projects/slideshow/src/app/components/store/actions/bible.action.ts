import { createAction, props } from "@ngrx/store";
import { BibleInfo } from "../../song-and-bible/models";

export const loadBibleInfo = createAction(
    '[Bible] Load Bible Info',
)

export const loadBibleInfoSuccess = createAction(
    '[Bible] Load Bible Info Success',
    props<{ bibleInfo: BibleInfo[] }>()
)

export const loadBibleInfoFailure = createAction(
    '[Bible] Load Bible Failure',
    props<{ error: any }>()
)

export const setCurrentBibleBook = createAction(
    '[Bible] Set Current Book',
    props<{ currentBook: BibleInfo }>()
)