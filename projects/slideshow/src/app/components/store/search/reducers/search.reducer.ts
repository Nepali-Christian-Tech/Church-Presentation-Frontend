import { createReducer, on } from "@ngrx/store";
import * as DataActions from '../actions/search.action';

export interface SearchState {
    searchText: string;
}

export const intialState: SearchState = {
    searchText: ''
}

export const searchReducer = createReducer(
    intialState,
    on(DataActions.setSearchText, (state, { text }) => ({ ...state, searchText: text }))
)