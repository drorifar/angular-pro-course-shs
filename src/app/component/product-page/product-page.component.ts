import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  productId: string;
  feedSubscription: Subscription;
  product: Product = new Product();
  constructor(private httpService: HttpService, private route: ActivatedRoute, private cartService: CartService) {

    this.route.data.subscribe(data => this.product = data.product);
    // this.route.params.subscribe((params: Params) => {
    //   this.productId = params.id;
    // });


    // this.feedSubscription = this.httpService.getData(0)
    //   .subscribe((data) => {
    //     this.product = data.find(p => p._id === this.productId);
    //   });

  }

  ngOnInit() {
  }

  addRemoveCart(product: Product) {
    if (this.cartService.existsInCart(product)) {
      this.cartService.removeFromCart(product);
    } else {
      this.cartService.addToCart(product);
    }
  }

  checkIsInCart() {
    return this.cartService.existsInCart(this.product);
  }

  ngOnDestroy(): void {
    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe();
    }
  }

}
