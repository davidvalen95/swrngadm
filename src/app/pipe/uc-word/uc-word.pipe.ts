import { Pipe, PipeTransform } from '@angular/core';
import {MyHelper} from '../../MyHelper';

@Pipe({
  name: 'ucWord'
})
export class UcWordPipe implements PipeTransform {

  transform(value: string, args?: any): any {

    return MyHelper.ucWord(value);
  }

}
