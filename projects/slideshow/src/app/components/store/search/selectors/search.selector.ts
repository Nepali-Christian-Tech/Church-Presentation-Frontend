import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchState } from "../reducers/search.reducer";

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchText = createSelector(
    selectSearchState,
    (state: SearchState) => state.searchText
)