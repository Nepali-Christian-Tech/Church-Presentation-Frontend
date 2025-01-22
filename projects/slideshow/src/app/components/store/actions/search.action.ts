import { createAction, props } from "@ngrx/store";

export const setSearchText = createAction(
    '[Search] Set Search Text',
    props<{ text: string }>()
)

export const setSearchTextSuccess = createAction(
    '[Search] Set Search Text Success',
    props<{ text: string }>()
);