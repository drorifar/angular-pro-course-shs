import { Action } from '@ngrx/store';

export enum FeedActionTypes {
  LoadFeed = '[Feed] Load Feeds',
  LoadFeedSuccess = '[Feed] Load Feeds Success'
}

export class LoadFeed implements Action {
  readonly type = FeedActionTypes.LoadFeed;
  constructor(public payload: number) {}
}

export class LoadFeedSuccess implements Action {
  readonly type = FeedActionTypes.LoadFeedSuccess;

  constructor(public payload: any) {}
}


export type FeedActions = LoadFeed | LoadFeedSuccess;
