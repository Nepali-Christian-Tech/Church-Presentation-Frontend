import { createReducer, on } from "@ngrx/store";
import * as DataActions from '../actions/loader.action';

export interface LoaderState {
    loading: boolean;
}

export const initialState: LoaderState = {
    loading: false
}

export const loaderReducer = createReducer(
    initialState,
    on(DataActions.startLoading, (state) => ({ ...state, loading: true })),
    on(DataActions.stopLoading, (state) => ({ ...state, loading: false })),
)