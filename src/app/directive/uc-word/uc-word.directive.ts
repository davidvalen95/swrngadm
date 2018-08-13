import {ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, SimpleChanges} from '@angular/core';
import {MyHelper} from '../../MyHelper';

@Directive({
    selector: '[appUcWord]',

})
export class UcWordDirective {


    /**
     * CAREFUL IT IS NOT WORKING DONT USE THIS
     * @param {ElementRef} elementRef
     * @param {ChangeDetectorRef} changeDetector
     */
    constructor(public elementRef:ElementRef, public changeDetector : ChangeDetectorRef){
    }

    ngOnInit(){
        // console.log('halo');
    }
    ngAfterViewInit(){

        // this.elementRef.nativeElement.innerHTML = MyHelper.ucWord(this.elementRef.nativeElement.innerHTML);



    }


    @HostListener('change') ngOnChanges() {
        // this.elementRef.nativeElement.innerHTML = MyHelper.ucWord(this.elementRef.nativeElement.innerHTML);

    }



}
