import { createReducer, on } from "@ngrx/store";
import { Song } from "../../song-and-bible/models";
import * as DataActions from '../actions/song.action';

export interface SongState {
    songs: Song[],
    loading: boolean,
    error: any,
    currentSong: Song | null
}

export const initialState: SongState = {
    songs: [],
    loading: false,
    error: null,
    currentSong: null
}

export const songReducer = createReducer(
    initialState,
    on(DataActions.loadSongs, (state) => ({ ...state, loading: true })),
    on(DataActions.loadSongsSuccess, (state, { songs }) => ({ ...state, loading: false, songs })),
    on(DataActions.loadSongsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(DataActions.setCurrentSong, (state, { currentSong }) => ({ ...state, loading: false, currentSong })),
)