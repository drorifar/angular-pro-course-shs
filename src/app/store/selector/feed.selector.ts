import { State } from 'src/app/reducers';
import { FeedState } from '../reducer/feed.reducer';
import { createSelector } from '@ngrx/store';

// export const authFeature = createFeatureSelector('authState');

export const selectFeedState = (state: State) => state.feedState;

export const feedSelector = createSelector(selectFeedState,
    (state: FeedState) => state.products );

