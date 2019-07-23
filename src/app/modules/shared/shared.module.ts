import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempComponent } from './components/temp/temp.component';
import { ProductComponent } from './components/product/product.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { NgNotIfDirective } from './directives/ng-not-if.directive';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { NgNotIf2Directive } from './directives/ng-not-if2.directive';
import {
  MatGridListModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule,
  MatInputModule, MatFormFieldModule, MatToolbarModule, MatAutocompleteModule
} from '@angular/material';
import { ImgDialogComponent } from './components/img-dialog/img-dialog.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';

@NgModule({
  declarations: [TempComponent, ProductComponent, DiscountPipe, NgNotIfDirective,
    ScrollEndDirective,
    NgNotIf2Directive, ImgDialogComponent, AutoCompleteComponent],
  imports: [
    CommonModule,
    MatGridListModule, MatFormFieldModule, MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule, MatInputModule, MatAutocompleteModule
  ],
  exports: [TempComponent, ProductComponent, DiscountPipe, NgNotIfDirective,
    ScrollEndDirective, ImgDialogComponent, MatToolbarModule,
    NgNotIf2Directive, MatGridListModule, MatInputModule, MatFormFieldModule, AutoCompleteComponent, MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule],

  entryComponents: [ImgDialogComponent]
})
export class SharedModule { }
