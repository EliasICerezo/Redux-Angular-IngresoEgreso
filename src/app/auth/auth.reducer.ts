import { User } from './user.model';
import { actions, SET_USER } from './auth.actions';


export interface AuthState{
    user:User;
}


const estadoInicial: AuthState = {
    user:null
};

export function authReducer(state = estadoInicial, action: actions){
    switch(action.type){
        case SET_USER:
            return{
                user: {...action.user}
            }
        default:
            return state;
    }
}