import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'keepAsHtml'
})
@Injectable()

export class KeepAsHtmlPipe implements PipeTransform {


    constructor(private sanitizer: DomSanitizer) {

    }

    transform(value: string, ...args) {
        if (!value) {
            return '-';
        }
        return this.sanitizer.bypassSecurityTrustHtml(value);
        // return value.toLowerCase();
    }

}
