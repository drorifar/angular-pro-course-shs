import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let discountPrecent = 0.8;
    if (args && args.length > 0) {
      discountPrecent = args[0];
    }
    if (value && value > 20) {
      return value * discountPrecent;
    } else {
      return value;
    }
  }

}
