import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userName: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor( private router: Router) { }

  getUserName() {
    return this._userName.asObservable();
  }

  setUserName(userName: string) {
    this._userName.next(userName);
  }

  login(userName: string) {
    this.setUserName(userName);
    this.router.navigateByUrl('feed');
  }

  logout() {    
    this.setUserName(null);
    this.router.navigateByUrl('/');
  }
}
