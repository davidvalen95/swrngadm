import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {PipeModule} from '../pipe/pipe.module';
import {FloatingInputComponent} from './floating-input/floating-input/floating-input.component';
import {FormErrorMessageComponent} from './floating-input/form-error-message/form-error-message.component';
import {HelperService} from '../service/helper/helper.service';
import { RowFloatingInputComponent } from './floating-input/row-floating-input/row-floating-input.component';
import {FormsModule} from '@angular/forms';
import { KeyValueComponent } from './key-value/key-value/key-value.component';
import { PaginationComponent } from './pagination/pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipeModule,
        FormsModule,


    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        FloatingInputComponent,
        FormErrorMessageComponent,
        RowFloatingInputComponent,
        KeyValueComponent,
        PaginationComponent,

    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        FloatingInputComponent,
        FormErrorMessageComponent,
        RowFloatingInputComponent,
        KeyValueComponent,
        PaginationComponent,



    ]
})
export class ComponentsModule {
}
