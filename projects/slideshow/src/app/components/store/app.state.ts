import { ActionReducerMap } from "@ngrx/store";
import { bibleReducer, BibleState } from "./bible/reducers/bible.reducer";
import { loaderReducer, LoaderState } from "./loader/reducers/loader.reducer";
import { searchReducer, SearchState } from "./search/reducers/search.reducer";
import { songReducer, SongState } from "./song/reducers/song.reducer";

export interface AppState {
    song: SongState;
    bible: BibleState;
    search: SearchState;
    loader: LoaderState;
}

export const appReducers: ActionReducerMap<AppState> = {
    song: songReducer,
    bible: bibleReducer,
    search: searchReducer,
    loader: loaderReducer
}