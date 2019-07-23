import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CartDetailComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule    
    ]
})
export class CartModule { }
