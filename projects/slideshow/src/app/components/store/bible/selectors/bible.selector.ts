import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BibleState, selectAllBible } from "../reducers/bible.reducer";

export const selectBibleState = createFeatureSelector<BibleState>('bible');

export const selectAllBibleInfo = createSelector(
    selectBibleState,
    selectAllBible
)

export const selectCurrentBook = createSelector(
    selectBibleState,
    (state: BibleState) => state.currentBook
)