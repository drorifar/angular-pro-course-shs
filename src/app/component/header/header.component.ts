import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  AuthService
} from 'src/app/services/auth.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AutocompleteService } from 'src/app/services/autocomplete.service';
import { IAutoCompleteProvider } from 'src/app/models/iAutoCompleteProvider';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { userSelector } from 'src/app/store/selector/auth.selector';
import { LoginUser } from 'src/app/store/action/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string;

  userSub: Subscription;

  search$: Subject<string> = new Subject<string>();

  productProvider: IAutoCompleteProvider;

  constructor(private authService: AuthService, private autocompleteService: AutocompleteService, private store: Store<any>) {
    this.productProvider = this.autocompleteService;
   }

  ngOnInit() {
    // this.userSub = this.authService.getUserName().subscribe((userName: string) => this.userName = userName);

    this.store.select(userSelector).subscribe((user) => this.userName = user);

    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(), 
      //switchMap((term) => this.autocompleteService.getItems(term))
    ).subscribe(console.log);
  }

  logout() {
    // this.authService.logout();
    this.store.dispatch(new LoginUser(null));
  }

  search(term) {
    //console.log(term);
    this.search$.next(term);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
