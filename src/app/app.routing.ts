import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {SelectListComponent} from './page/database/select-list/select-list.component';
import {RoomComponent} from './page/module/room/room.component';
import {PageTitleComponent} from './page/database/page-title/page-title.component';
import {AdvertisementComponent} from './page/module/advertisement/advertisement.component';

const routes: Routes =[
    { path: 'dashboard',       component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'database/select-list',        component:         SelectListComponent},
    { path: 'database/page-title',        component:         PageTitleComponent},
    { path: 'module/room',        component:         RoomComponent},
    { path: 'module/advertisement',        component:         AdvertisementComponent},
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
