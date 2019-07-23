import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { userSelector } from '../store/selector/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private store: Store<any>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(userSelector).pipe(
        switchMap((user) => {
          if (user) {
            return of(true);
          } else {
            this.router.navigateByUrl('/');
            return of(false);
          }
        })
      // return this.authService.getUserName().pipe(
      //   switchMap((user) => {
      //     if (user) {
      //       return of(true);
      //     } else {
      //       this.router.navigateByUrl('/');
      //       return of(false);
      //     }
      //   })
      //   map((user) => {
      //     if (user) {
      //       return true;
      //     } else {
      //       this.router.navigateByUrl('/');
      //       return false;
      //     }
      //   })
       )
  }
}
