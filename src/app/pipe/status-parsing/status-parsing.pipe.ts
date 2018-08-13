import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusParsing'
})
export class StatusParsingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
