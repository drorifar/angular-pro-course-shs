import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Subscription
} from 'rxjs';
import {
  Product
} from 'src/app/models/product';
import {
  HttpService
} from 'src/app/services/http.service';
import {
  CartService
} from 'src/app/services/cart.service';
import {
  Store
} from '@ngrx/store';
import {
  feedSelector
} from 'src/app/store/selector/feed.selector';
import {
  LoadFeed
} from 'src/app/store/action/feed.actions';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss']
})
export class ProductsContainerComponent implements OnInit, OnDestroy {

  items: Product[] = new Array<Product>();
  cartItems: Product[] = new Array();
  cartSubscription: Subscription;
  cartPrice: number;
  itemsPage = 0;
  loadingPage = false;
  feedSubscription: Subscription;
  user: string;
  addToItems = false;

  constructor(private httpService: HttpService,
    private cartService: CartService, private store: Store < any > ) {
    // this.feedSubscription = this.httpService.getData(this.itemsPage)
    //   .subscribe((data) => {
    //     this.items = data;
    //   });
    this.store.select(feedSelector).subscribe((data) => {
      // debugger;
      if (data) {
        if (!this.addToItems) {
           this.items = data;
           // data.forEach(p => this.items.push(p));
        } else {
          this.items = [...this.items, ...data];
          // data.forEach(p => this.items.push(p));
          this.loadingPage = false;
        }
      }
    });

    this.store.dispatch(new LoadFeed(this.itemsPage));

    this.cartSubscription = this.cartService.getCart()
      .subscribe((items) => {
        this.cartItems = items;
      });
  }

  ngOnInit() {
    this.cartPrice = this.cartService.getSum();
  }

  nextPage() {
    this.itemsPage++;
    // this.httpService.getData(this.itemsPage)
    //   .subscribe((data) => {
    //     this.items = data;
    //   });
    this.addToItems = false;
    this.store.dispatch(new LoadFeed(this.itemsPage));
  }

  prevPage() {
    if (this.itemsPage > 0) {
      this.itemsPage--;
      // this.httpService.getData(this.itemsPage)
      //   .subscribe((data) => {
      //     this.items = data;
      //   });
      this.addToItems = false;
      this.store.dispatch(new LoadFeed(this.itemsPage));
    }
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

  scrollOnBottem(isOnBottom: boolean) {
    if (isOnBottom && !this.loadingPage) {
      this.loadingPage = true;
      this.itemsPage++;
      this.addToItems = true;
      this.store.dispatch(new LoadFeed(this.itemsPage));
      // this.httpService.getData(this.itemsPage)
      //   .subscribe((data) => {
      //     debugger;
      //     data.forEach(p => this.items.push(p));
      //     this.loadingPage = false;
      //   });
    }
  }

  checkIsInCart(productId) {
    return this.cartItems.findIndex(a => a._id === productId) > -1;
  }

  navigateToCart() {
    // this.router.navigateByUrl('feed');
  }

  ngOnDestroy(): void {
    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe();
    }

    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
