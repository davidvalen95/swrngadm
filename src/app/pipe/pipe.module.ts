import { NgModule }      from '@angular/core';
import {IsLoggedInPipe} from './isLoggedIn/is-logged-in.pipe';
import { UcWordPipe } from './uc-word/uc-word.pipe';
import { KeepAsHtmlPipe } from './keep-as-html/keep-as-html.pipe';
import { StatusParsingPipe } from './status-parsing/status-parsing.pipe';


@NgModule({
    imports:        [],
    declarations:   [
        IsLoggedInPipe,
        UcWordPipe,
        KeepAsHtmlPipe,
        StatusParsingPipe,
    ],
    exports:        [
        IsLoggedInPipe,
        UcWordPipe,
        KeepAsHtmlPipe,
        StatusParsingPipe,

    ],
})

export class PipeModule {

}