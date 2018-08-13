import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
    selector: '[appStatusParsing]'
})


/**
 * DONT USE THIS.. USE SERVER VALUE
 */
export class StatusParsingDirective {


    @HostBinding('style.color') color = '#222222';

    public colorTarget: any = {
        tomato: [{
            alias: 'pa',
            realName: 'Pending Approval'
        }],
        green: ['approved'],
    }

    constructor(public elementRef: ElementRef) {


        // this.elementRef.nativeElement.textContent
    }

    ngOnInit() {
        for (var key in this.colorTarget) {
            var value: AliasInterface = this.colorTarget[key];

            // this.eleme
        }
    }

}

interface AliasInterface {
    alias: string;
    realName: string;
}
