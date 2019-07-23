import { Action } from '@ngrx/store';
import { AuthActionTypes, AuthActions } from '../action/auth.actions';


export interface AuthState {
  userName: string;
  loading: boolean;
}

export const initialState: AuthState = {
  userName: null,
  loading: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginUser:
      return { ...state, loading: true };

    case AuthActionTypes.LoginUserSuccess:
      return { ...state, loading: false,  userName: action.payload };

    default:
      return {...state};
  }
}
