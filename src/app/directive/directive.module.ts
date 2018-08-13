import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PipeModule} from '../pipe/pipe.module';
import {FormsModule} from '@angular/forms';
import {UcWordDirective} from './uc-word/uc-word.directive';
import { MarkClickedDirective } from './mark-clicked/mark-clicked.directive';
import { StatusParsingDirective } from './status-parsing/status-parsing.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipeModule,
        FormsModule,


    ],
    declarations: [
        UcWordDirective,
        MarkClickedDirective,
        StatusParsingDirective,

    ],
    exports: [
        UcWordDirective,
        MarkClickedDirective,
        StatusParsingDirective,



    ]
})
export class DirectiveModule {
}
