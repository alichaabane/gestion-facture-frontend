import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../service/http/user.service";

declare interface RouteInfo {
  path: string;
  title: string;
  isAdminPage: boolean;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/actualite-mgm', title: 'إدارة المستجدات', isAdminPage: false, icon: 'ui-1_check', class: ''},
  {path: '/conference-mgm', title: 'إدارة المحاضرات', isAdminPage: false, icon: 'ft-file-text', class: ''},
  {path: '/recherches-mgm', title: 'إدارة البحوث', isAdminPage: false, icon: 'ft-book-open', class: ''},
  {path: '/magazines-mgm', title: 'إدارة المجلات الثقافية', isAdminPage: false, icon: 'ft-book', class: ''},
  {path: '/responsables-mgm', title: 'إدارة أعضاء الفروع', isAdminPage: false, icon: 'users_circle-08', class: ''},
  {path: '/nationale-responsables-mgm', title: 'إدارة أعضاء الهيئات', isAdminPage: false, icon: 'users_circle-08', class: ''},
  {path: '/region-responsables-mgm', title: 'إدارة الفروع الجهوية', isAdminPage: false, icon: 'ft-map-pin', class: ''},
  {path: '/user-mgm', title: 'إدارة مديري الموقع', isAdminPage: false, icon: 'ft-user-check', class: ''},
  {path: '/adherent-mgm', title: 'إدارة الأعضاء المنخرطين', isAdminPage: false, icon: 'ft-users', class: ''},
  {path: '/message-mgm', title: 'تصفح الرسائل', isAdminPage: true, icon: 'ui-2_chat-round', class: ''},
  {path: '/login', title: 'خروج', isAdminPage: false, icon: 'media-1_button-power', class: ''},
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isAdminPage: boolean = false;

  constructor(private authService: SocialAuthService, private spinner: NgxSpinnerService, private userService: UserService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userService.isAdmin().then(res => {
      this.isAdminPage = res;
    })
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  };

  async logout() {
    await this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.userService.removeAllStorage();
      this.signOut();
    }, 400);

  }

  async signOut() {
    await this.authService.signOut(true);
  }

}
