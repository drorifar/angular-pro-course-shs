import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from '../reducer/auth.reducer';
import { State } from 'src/app/reducers';

// export const authFeature = createFeatureSelector('authState');

export const selectAuthState = (state: State) => state.authState;

export const userSelector = createSelector(selectAuthState,
    (state: AuthState) => state.userName );

