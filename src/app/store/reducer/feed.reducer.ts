import {
  Action
} from '@ngrx/store';
import {
  Product
} from 'src/app/models/product';
import {
  FeedActionTypes,
  FeedActions
} from '../action/feed.actions';


export interface FeedState {
  products: Product[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: FeedState = {
  products: [],
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: FeedActions): FeedState {
  switch (action.type) {
    case FeedActionTypes.LoadFeed:
      return {
        ...state, loading: true
      };
    case FeedActionTypes.LoadFeedSuccess:
      return {
        ...state, loading: false, loaded: true, products: action.payload
      };
    default:
      return state;
  }
}
