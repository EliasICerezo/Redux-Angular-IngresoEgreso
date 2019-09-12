import * as ie from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { EMPTY_ITEMS, SET_ITEMS } from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState{
    items: IngresoEgreso[];
}

export interface AppState extends AppState{
    ingresoegreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items:[]
};


export function ingresoEgresoReducer(state = estadoInicial, action:ie.actions):IngresoEgresoState{
    switch(action.type){
        case ie.EMPTY_ITEMS:
            return {
                items:[],
            };
        case ie.SET_ITEMS:
            return {
                items: [...state.items , ...action.items]
            };
        default:
            return state;
    }
}

