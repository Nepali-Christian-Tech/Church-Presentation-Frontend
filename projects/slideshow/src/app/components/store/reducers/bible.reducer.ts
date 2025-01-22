import { createReducer, on } from "@ngrx/store";
import { BibleInfo } from "../../song-and-bible/models";
import * as DataActions from '../actions/bible.action';

export interface BibleState {
    bibleInfo: BibleInfo[],
    loading: boolean,
    error: any,
    currentBook: BibleInfo | null
}

export const initialState: BibleState = {
    bibleInfo: [],
    loading: false,
    error: null,
    currentBook: null
}

export const bibleReducer = createReducer(
    initialState,
    on(DataActions.loadBibleInfo, state => ({ ...state, loading: true })),
    on(DataActions.loadBibleInfoSuccess, (state, { bibleInfo }) => ({ ...state, loading: false, bibleInfo })),
    on(DataActions.loadBibleInfoFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(DataActions.setCurrentBibleBook, (state, { currentBook }) => ({ ...state, loading: false, currentBook })),
)