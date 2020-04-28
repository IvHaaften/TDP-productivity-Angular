import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class Filter implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    for (var i = value.length - 1; i >= 0; i--) {
      newStr += value.charAt(i);
    }
    return newStr;
  }
}