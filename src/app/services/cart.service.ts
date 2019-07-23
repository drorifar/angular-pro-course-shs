import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';
import {
  Product
} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  private _cart: BehaviorSubject < Product[] > = new BehaviorSubject < Product[] > (new Array());

  getCart() {
    return this._cart.asObservable();
  }

  setCart(products: Product[]) {
    this._cart.next(products);
  }

  addToCart(product: Product) {
    const cart = this._cart.value;
    cart.push(product);
    this.setCart(cart);
  }

  removeFromCart(product: Product) {
    const cart = this._cart.value;
    const index = cart.findIndex(a => a._id === product._id);
    if (index > -1) {
      cart.splice(index, 1);
    }
    this.setCart(cart);
  }

  existsInCart(product: Product): boolean {
    const cart = this._cart.value;
    const index = cart.findIndex(a => a._id === product._id);
    if (index > -1) {
      return true;
    }
    return false;
  }

  getSum(): number {
    let cartPrice = 0;
    const cart = this._cart.value;
    cart.forEach(p => cartPrice += p.price / 100);
    return cartPrice;
  }

}
