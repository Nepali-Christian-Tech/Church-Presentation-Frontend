import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Song } from "../../../song-and-bible/models";
import * as DataActions from '../actions/song.action';

export interface SongState extends EntityState<Song> {
    currentSong: Song | null
}

export const adaptor = createEntityAdapter<Song>();

export const initialState: SongState = adaptor.getInitialState({
    currentSong: null
});

export const songReducer = createReducer(
    initialState,
    on(DataActions.loadSongsSuccess, (state, { songs }) => adaptor.setAll(songs, state)),
    on(DataActions.setCurrentSong, (state, { currentSong }) => ({ ...state, currentSong })),
    on(DataActions.loadSongsFailure, (state, { error }) => ({ ...state, error })),
    on(DataActions.clearSongs, state => adaptor.removeAll({ ...state, currentSong: null }))
)

export const {
    selectAll: selectAllSongs,
    selectEntities: selectSongEntities,
    selectIds: selectSongId,
    selectTotal: selectTotalSongs
} = adaptor.getSelectors();