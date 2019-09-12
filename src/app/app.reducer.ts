import  *  as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';




export interface AppState{
    ui:ui.State;
    auth:auth.AuthState;
}


export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer,
    // ingresoegreso : ie.ingresoEgresoReducer
};