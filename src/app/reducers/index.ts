import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../store/reducer/auth.reducer';
import * as fromFeed from '../store/reducer/feed.reducer';

export interface State {
 authState: fromAuth.AuthState,
 feedState: fromFeed.FeedState,
}

export const reducers: ActionReducerMap<State> = {
  authState: fromAuth.reducer,
  feedState: fromFeed.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
