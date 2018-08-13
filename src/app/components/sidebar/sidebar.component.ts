import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge?:string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: 'database/select-list', title: 'Select List Configuration',  icon:'content_paste', class: '' },
    { path: 'database/page-title', title: 'Page Title',  icon:'content_paste', class: '' },
    { path: 'module/room', title: 'Room',  icon:'forward', class: '', badge:'room' },
    { path: 'module/advertisement', title: 'Advertisement',  icon:'forward', class: '', badge:'advertisement' },
    // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideMenu: any[];

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.sideMenu = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
