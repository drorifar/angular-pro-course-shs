import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, LoginUserSuccess, AuthActions } from '../action/auth.actions';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {



  constructor(private actions$: Actions, private router: Router) {}

  @Effect()
  userEffect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginUser),
    map((action: AuthActions) => new LoginUserSuccess(action.payload))
  );

  @Effect({dispatch: false})
  loginEffect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginUserSuccess),
    tap((action: AuthActions) => {
      if (action.payload) {
         this.router.navigateByUrl('feed');
      } else {
        this.router.navigateByUrl('/');
      }
  })
  );
}
