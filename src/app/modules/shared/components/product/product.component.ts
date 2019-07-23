import {
  Component,
  OnInit,
  Input,
  Output
} from '@angular/core';
import {
  Product
} from 'src/app/models/product';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImgDialogComponent } from '../img-dialog/img-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() isInCart: boolean;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter();
  showBest: boolean = false;
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {  }

  openDialog(): void {

    // this.showBest = !this.showBest;
    // console.log(this.showBest);

    const dialogRef = this.dialog.open(ImgDialogComponent, {
      width: '1000px',
      height: '1000px',
      data: {imgURl: this.product.imageUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addRemoveProductToCart(product: Product) {
    this.addToCart.emit(product);
   }

   openProductPage() {
     this.router.navigate(['/product', this.product._id]);
   }


}
