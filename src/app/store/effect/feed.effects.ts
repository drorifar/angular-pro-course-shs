import {
  Injectable
} from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {
  FeedActions,
  FeedActionTypes,
  LoadFeedSuccess
} from '../action/feed.actions';
import {
  map,
  switchMap
} from 'rxjs/operators';
import {
  HttpService
} from 'src/app/services/http.service';



@Injectable()
export class FeedEffects {



  constructor(private actions$: Actions, private feedService: HttpService) {}


  // @Effect()
  // loadFeedEffect$ = this.actions$.pipe(
  //   ofType(FeedActionTypes.LoadFeed),
  //   map((action: FeedActions) => {
  //     this.feedService.getData(action.payload).subscribe((data) => {
  //       return new LoadFeedSuccess(action.payload);
  //     });
  //   }));

  @Effect()
  loadFeedEffect$ = this.actions$.pipe(
    ofType(FeedActionTypes.LoadFeed),
    switchMap((action: FeedActions) => {
      return this.feedService.getData(action.payload).pipe(
        map((products) => {
          return new LoadFeedSuccess(products);
        })
      )
    }));


// @Effect({dispatch: false})
// loginEffect$ = this.actions$.pipe(
//   ofType(AuthActionTypes.LoginUserSuccess),
//   tap((action: AuthActions) => {
//     if (action.payload) {
//        this.router.navigateByUrl('feed');
//     } else {
//       this.router.navigateByUrl('/');
//     }
// })
// );

}
