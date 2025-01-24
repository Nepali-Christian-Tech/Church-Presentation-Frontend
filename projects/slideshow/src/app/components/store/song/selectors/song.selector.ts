import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAllSongs, SongState } from "../reducers/song.reducer";

export const selectSongState = createFeatureSelector<SongState>('song');

export const selectAllSongList = createSelector(
    selectSongState,
    selectAllSongs
)

export const selectCurrentSong = createSelector(
    selectSongState,
    (state: SongState) => state.currentSong
)