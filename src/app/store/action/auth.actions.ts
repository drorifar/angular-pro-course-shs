import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginUser = '[Auth] Login User',
  LoginUserSuccess = '[Auth] Login User Success',
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LoginUser;

  constructor(public payload: string) {}
}


export class LoginUserSuccess implements Action {
  readonly type = AuthActionTypes.LoginUserSuccess;

  constructor(public payload: string) {}
}

export type AuthActions = LoginUser | LoginUserSuccess;
