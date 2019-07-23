import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  db
} from './db';
import {
  Product
} from './models/product';
import {
  HttpService
} from './services/http.service';
import {
  Subscription,
  Observable
} from 'rxjs';
import {
  AuthService
} from './services/auth.service';
import {
  CartService
} from './services/cart.service';
import { Store } from '@ngrx/store';
import { AuthState } from './store/reducer/auth.reducer';
import { LoginUserSuccess, LoginUser } from './store/action/auth.actions';
import { LoadFeed } from './store/action/feed.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'shs-course-project';
  items: any[];
  cartItems: Product[] = new Array();
  cartSubscription: Subscription;
  cartPrice: number;
  itemsPage = 0;
  loadingPage = false;
  feedSubscription: Subscription;
  user: string;

  constructor(private httpService: HttpService, private authService: AuthService,
              private cartService: CartService, private authStore: Store<any>) { }
  ngOnInit(): void {
    this.authService.setUserName(null);

    this.feedSubscription = this.httpService.getData(this.itemsPage)
      .subscribe((data) => {
        this.items = data;
      });

    this.cartSubscription = this.cartService.getCart()
      .subscribe((items) => {
        this.cartItems = items;
      });

   // this.authStore.dispatch(new LoginUser('aa'));
    

  }

  nextPage() {
    this.itemsPage++;
    this.httpService.getData(this.itemsPage)
      .subscribe((data) => {
        this.items = data;
      });
  }

  prevPage() {
    if (this.itemsPage > 0) {
      this.itemsPage--;
      this.httpService.getData(this.itemsPage)
        .subscribe((data) => {
          this.items = data;
        });
    }
  }

  addRemoveCart_OLD(product: Product) {
    const index = this.cartItems.findIndex(a => a._id === product._id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    } else {
      this.cartItems.push(product);
    }
    this.cartPrice = 0;
    this.cartItems.forEach(p => this.cartPrice += p.price / 100);
  }

  addRemoveCart(product: Product) {
    if (this.cartService.existsInCart(product)) {
      this.cartService.removeFromCart(product);
    } else {
      this.cartService.addToCart(product);
    }
    this.cartPrice = 0;
    this.cartPrice = this.cartService.getSum();
  }

  checkIsInCart(productId) {
    return this.cartItems.findIndex(a => a._id === productId) > -1;
  }

  scrollOnBottem(isOnBottom: boolean) {
    if (isOnBottom && !this.loadingPage) {
      this.loadingPage = true;
      this.itemsPage++;
      this.httpService.getData(this.itemsPage)
        .subscribe((data) => {
          data.forEach(p => this.items.push(p));
          this.loadingPage = false;
        });
    }
  }

  ngOnDestroy(): void {

  }
}
