import { createAction, props } from "@ngrx/store";
import { Song } from "../../song-and-bible/models";

export const loadSongs = createAction('[Songs] Load Songs')

export const loadSongsSuccess = createAction(
    '[Songs] Load Songs Success',
    props<{ songs: Song[] }>()
)

export const loadSongsFailure = createAction(
    '[Songs] Load Songs Failure',
    props<{ error: any }>()
)

export const setCurrentSong = createAction(
    '[Song] Set Current Song',
    props<{ currentSong: Song }>()
)