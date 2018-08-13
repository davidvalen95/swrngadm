import {Component, Input, OnInit} from '@angular/core';
import {BaseForm} from '../BaseForm';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-row-floating-input',
    templateUrl: './row-floating-input.component.html',
    styleUrls: ['./row-floating-input.component.scss']
})
export class RowFloatingInputComponent implements OnInit {



    @Input('rowBaseForms') rowBaseForms:RowFloatingInputInterface[];
    @Input('parentForm') parentForm:NgForm;

    constructor() {
    }

    ngOnInit() {
        console.log('rowFLoating', this.rowBaseForms);
    }



}


export interface RowFloatingInputInterface {

    baseForms:BaseForm[];

}
