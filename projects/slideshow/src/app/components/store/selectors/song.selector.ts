import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SongState } from "../reducers/song.reducer";

export const selectSongState = createFeatureSelector<SongState>('song');

export const selectSong = createSelector(
    selectSongState,
    (state: SongState) => state.songs
)

export const selectSongLoading = createSelector(
    selectSongState,
    (state: SongState) => state.loading
)

export const selectSongFailure = createSelector(
    selectSongState,
    (state: SongState) => state.error
)

export const selectCurrentSong = createSelector(
    selectSongState,
    (state: SongState) => state.currentSong
)