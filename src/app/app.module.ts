import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Pipe} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {UserService} from './service/user/user.service';
import {ApiService} from './service/api/api.service';
import {HttpClientModule} from '@angular/common/http';

import {PipeModule} from './pipe/pipe.module';
import {LoginComponent} from './page/login/login.component';
import {MyLocalStorageService} from './service/my-local-storage/my-local-storage.service';
import {HelperService} from './service/helper/helper.service';
import { SelectListComponent } from './page/database/select-list/select-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RoomComponent} from './page/module/room/room.component';
import {DirectiveModule} from './directive/directive.module';
import {PageTitleComponent} from './page/database/page-title/page-title.component';
import { AdvertisementComponent } from './page/module/advertisement/advertisement.component';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        LoginComponent,
        SelectListComponent,
        RoomComponent,
        PageTitleComponent,
        AdvertisementComponent,



    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        PipeModule,
        NgbModule.forRoot(),
        DirectiveModule

    ],
    providers: [
        UserService,
        ApiService,
        MyLocalStorageService,
        HelperService,


    ],

    bootstrap: [AppComponent],


})
export class AppModule {
}
