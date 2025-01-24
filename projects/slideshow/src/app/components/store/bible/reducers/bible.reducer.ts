import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { BibleInfo } from "../../../song-and-bible/models";
import * as DataActions from '../actions/bible.action';

export interface BibleState extends EntityState<BibleInfo> {
    currentBook: BibleInfo | null
}

export const adaptor = createEntityAdapter<BibleInfo>({
    selectId: (entity) => entity.bookId
});

export const initialState: BibleState = adaptor.getInitialState({
    currentBook: null
});


export const bibleReducer = createReducer(
    initialState,
    on(DataActions.loadBibleInfoSuccess, (state, { bibleInfo }) => adaptor.setAll(bibleInfo, state)),
    on(DataActions.setCurrentBibleBook, (state, { currentBook }) => ({ ...state, currentBook })),
    on(DataActions.clearBible, state => adaptor.removeAll({ ...state, currentBook: null }))
)

export const {
    selectAll: selectAllBible,
    selectEntities: selectBibleEntities,
    selectIds: selectBibleId,
    selectTotal: selectTotalBible
} = adaptor.getSelectors();