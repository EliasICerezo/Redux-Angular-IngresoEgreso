import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';
export const SET_ITEMS = '[Ingreso Egreso] Set Items'
export const EMPTY_ITEMS = '[Ingreso Egreso] Empty Items'

export class SetItemsAction implements Action{
    readonly type = SET_ITEMS;

    constructor(public items:IngresoEgreso[]){

    }
}


export class EmptyItemsAction implements Action{
    readonly type = EMPTY_ITEMS;

}

export type actions = SetItemsAction | EmptyItemsAction;