import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appMarkClicked]',
    host: {
        class: 'transitionAny',
    }
})
export class MarkClickedDirective {

    public isDone: boolean = true;
    @HostBinding('style.color') color: string = 'black';
    @HostBinding('style.fontWeight') fontWeight: string = 'normal';

    @HostListener('click') onClick() {
        if (!this.isDone) {
            return;
        }
        this.isDone = false;
        var colorOrigin = this.color;
        this.color = 'tomato';
        // this.fontWeight = "bold";

        setTimeout(() => {
            this.isDone = true;
            this.color = colorOrigin;
            // this.fontWeight = "normal";
        }, 1500)
    }

    constructor(public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.color = this.elementRef.nativeElement.style.color;
    }

}
