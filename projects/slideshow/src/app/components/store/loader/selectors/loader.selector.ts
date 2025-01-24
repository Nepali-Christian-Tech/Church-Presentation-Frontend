import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoaderState } from "../reducers/loader.reducer";

export const selectLoadingState = createFeatureSelector<LoaderState>('loader');

export const selectLoader = createSelector(
    selectLoadingState,
    (state: LoaderState) => state.loading
)