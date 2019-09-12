import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI] Loading Activado';
export const DESACTIVAR_LOADING = '[UI] Loading Terminado';


export class ActivarLoadingAction implements Action{
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action{
    readonly type = DESACTIVAR_LOADING;
}

export type actions = ActivarLoadingAction | DesactivarLoadingAction;