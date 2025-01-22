import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BibleState } from "../reducers/bible.reducer";


export const selectBibleState = createFeatureSelector<BibleState>('bible');

export const selectBibleInfo = createSelector(
    selectBibleState,
    (state: BibleState) => state.bibleInfo
)

export const selectBibleLoading = createSelector(
    selectBibleState,
    (state: BibleState) => state.loading
)

export const selectBibleFailure = createSelector(
    selectBibleState,
    (state: BibleState) => state.error
)

export const selectCurrentBook = createSelector(
    selectBibleState,
    (state: BibleState) => state.currentBook
)