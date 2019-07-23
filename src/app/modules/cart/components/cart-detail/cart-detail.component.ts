import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit, OnDestroy {
  cartPrice: number;
  cartProducts: Product[];
  cartSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.cartSubscription = this.cartService.getCart().subscribe(cart =>
      {
        this.cartProducts = cart;
      });
   }

  ngOnInit() {
    this.cartPrice = this.cartService.getSum();
  }

  checkIsInCart(productId) {
    return this.cartProducts.findIndex(a => a._id === productId) > -1;
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

  ngOnDestroy(): void {
   if (this.cartSubscription) {
     this.cartSubscription.unsubscribe();
   }
  }
}
